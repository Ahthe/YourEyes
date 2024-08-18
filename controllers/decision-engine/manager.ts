import { plurals, readableClass } from "@/data/yolo_classes";
import { addSeconds, subSeconds } from "date-fns";
import { AudioGenerator, PlayerVolume } from "../audio-generator";
import { GPTVisionGenerator } from "../gpt-vision-generator/generator";
import { YoloManager } from "../yolo-manager";
import { DecisionHistory } from "./history";

export class DecisionEngine {
  private history: DecisionHistory<{ label: string; location: string }> =
    new DecisionHistory();

  constructor(
    private readonly audio: AudioGenerator,
    private readonly yolo: YoloManager,
    private readonly vision: GPTVisionGenerator
  ) {}

  start() {
    this.audio.start();
  }

  objectInference(seconds: number, useHistory = true) {
    const report = this.yolo.report(
      subSeconds(new Date(), seconds),
      new Date()
    );
    for (const object of report.objects) {
      const key = `${object.label}`;
      if (useHistory && this.history.get(key)) {
        continue;
      }

      let text: string = "";

      if (object.amount > 1) {
        text = `many ${plurals[object.label]}`;
      } else if (object.size === "small" || object.size === "medium") {
        text = `${readableClass[object.label]} ${
          object.location === "center" ? "front" : object.location
        }`;
      } else {
        text = `${readableClass[object.label]}`;
      }

      this.audio.playText({
        priority: 2,
        text: text,
        key: key,
        voice: "b",
        volume: PlayerVolume.low,
        expiry: addSeconds(new Date(), 3),
      });
      this.history.add(key, object, delays[object.label] ?? 5000);
    }
  }

  async visionInference(force: boolean) {
    const data = await this.vision.generate(force);
    if (!data) {
      return;
    }

    this.audio.playText({
      priority: 5,
      text: data.message.content,
      voice: "a",
      key: `gpt-vision-${Math.random()}`,
      volume: PlayerVolume.high,
      expiry: addSeconds(new Date(), 5),
    });
  }
}

const delays: { [key: string]: number } = {
  person: 10e3,
};
