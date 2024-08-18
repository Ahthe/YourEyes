import { differenceInSeconds } from "date-fns";
import { History } from "../audio-engine/history";

export class GPTVisionGenerator {
  history: History<string> = new History(5);
  generating: boolean = false;
  lastGenerated: Date = new Date();

  constructor(private cadence: number = 20) {}

  async setCadence(cadence: number) {
    this.cadence = cadence;
  }

  async generate(force: boolean) {
    console.log("FORCE", force);
    if (this.generating) {
      console.log("Already generating");
      return;
    }
    if (!force) {
      if (differenceInSeconds(new Date(), this.lastGenerated) < this.cadence) {
        console.log("Too soon to generate");
        return;
      }
    }

    if (typeof window !== "undefined" && !("sessionStorage" in window))
      return null;
    const image = sessionStorage.getItem("image");
    if (!image) {
      console.error("No image found in session storage");
      return null;
    }
    this.generating = true;
    try {
      const data = await fetch("/vision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: image,
          history: this.history.getArray(),
        }),
      }).then((response) => response.json());

      if (!data) {
        console.error("No data returned from vision endpoint");
        return null;
      }

      if (data.message.content.length < 10) {
        console.error("Vision response too short", data);
        return null;
      }

      this.history.add(data.message.content);

      return data as {
        message: {
          content: string;
        };
      };
    } finally {
      this.generating = false;
      this.lastGenerated = new Date();
    }
  }
}
