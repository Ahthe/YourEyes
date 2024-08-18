import { ICompare, PriorityQueue } from "@datastructures-js/priority-queue";

export type QueueTrackInput = {
  uri: string;
  key: string;
  text: string;
  volume: number;
  priority: number;
  expiry?: Date;
};

export interface QueuedTrack {
  input: QueueTrackInput;
  key: string;
  expiry?: Date;
  priority: number;
  text: string;
}

const compare: ICompare<QueuedTrack> = (a: QueuedTrack, b: QueuedTrack) => {
  if (a.priority > b.priority) {
    return 1;
  }
  if (a.priority < b.priority) {
    return -1;
  }
  return 0;
};

export const queue = new PriorityQueue<QueuedTrack>(compare);
