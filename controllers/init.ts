import { AudioPlayer } from "./audio-engine";
import { queue } from "./audio-engine/queue";
import { AudioGenerator } from "./audio-generator";
import { DecisionEngine } from "./decision-engine/manager";
import { GPTVisionGenerator } from "./gpt-vision-generator/generator";
import { YoloManager } from "./yolo-manager";

const SILENCE_BUFFER = 10000;

export const audioEngine = new AudioPlayer(queue, SILENCE_BUFFER);

export const audioGenerator = new AudioGenerator(audioEngine);

export const yoloManager = new YoloManager();

export const gptVision = new GPTVisionGenerator();
export const decisionEngine = new DecisionEngine(
  audioGenerator,
  yoloManager,
  gptVision
);

decisionEngine.start();

setInterval(() => {
  decisionEngine.objectInference(1);
}, 1e3);

setInterval(() => {
  decisionEngine.visionInference(false);
}, 5e3);
