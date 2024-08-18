import { AudioPlayer } from "../audio-engine";

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
  constructor(private readonly player: AudioPlayer) {}

  start() {
    this.player.start();
  }

  playText(input: PlayTextInput) {
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
  }
}
