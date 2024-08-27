import { AudioPlayer } from "../audio-engine";
import { PriorityQueue } from '@datastructures-js/priority-queue';

export enum PlayerVolume {
  low = 0.3,
  medium = 0.6,
  high = 1,
}

export type PlayTextInput = {
  priority: number;
  voice: "a" | "b";
  text: string;
  key: string;
  volume: PlayerVolume;
  expiry?: Date;
};

/** Utility class to help in queueing different audio clips, including TTS to the audio engine */
export class AudioGenerator {
  private queue: PriorityQueue<PlayTextInput>;

  constructor(private readonly player: AudioPlayer) {
    this.queue = new PriorityQueue((a, b) => b.priority - a.priority);
  }

  start() {
    this.player.start();
    this.processQueue();
  }

  playText(input: PlayTextInput) {
    this.queue.enqueue(input);
  }

  private processQueue() {
    if (this.queue.isEmpty()) {
      setTimeout(() => this.processQueue(), 100);
      return;
    }

    const input = this.queue.dequeue();
    const uri = new URL(
      `/tts/${input.voice}/${btoa(input.text)}.mp3`,
      window.location.origin
    );
    this.player.queueTrack({
      uri: uri.href,
      key: input.key,
      text: input.text,
      priority: input.priority,
      volume: input.volume,
      expiry: input.expiry,
    });

    setTimeout(() => this.processQueue(), 100);
  }
}
