import { yoloManager } from "@/controllers/init";
import { RecognizedObject } from "@/controllers/yolo-manager";
import { highConfidenceClasses, yoloClasses } from "@/data/yolo_classes";
import { createModelCpu } from "@/utils";
import ndarray from "ndarray";
import ops from "ndarray-ops";
import { Tensor } from "onnxruntime-web";
import { useEffect, useState } from "react";
import ObjectDetectionCamera from "../object-detection-camera";

const RES_TO_MODEL: [number[], string][] = [
  [[256, 256], "yolov7-tiny_256x256.onnx"],
  [[320, 320], "yolov7-tiny_320x320.onnx"],
  [[640, 640], "yolov7-tiny_640x640.onnx"],
];

export function Yolo() {
  const [modelResolution, setModelResolution] = useState<number[]>(
    RES_TO_MODEL[0][0]
  );
  const [modelName, setModelName] = useState<string>(RES_TO_MODEL[0][1]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const session = await createModelCpu(
        `./_next/static/chunks/pages/${modelName}`
      );
      setSession(session);
    };
    getSession();
  }, [modelName]);

  const changeModelResolution = () => {
    const index = RES_TO_MODEL.findIndex((item) => item[0] === modelResolution);
    if (index === RES_TO_MODEL.length - 1) {
      setModelResolution(RES_TO_MODEL[0][0]);
      setModelName(RES_TO_MODEL[0][1]);
    } else {
      setModelResolution(RES_TO_MODEL[index + 1][0]);
      setModelName(RES_TO_MODEL[index + 1][1]);
    }
  };

  const resizeCanvasCtx = (
    ctx: CanvasRenderingContext2D,
    targetWidth: number,
    targetHeight: number,
    inPlace = false
  ) => {
    let canvas: HTMLCanvasElement;

    if (inPlace) {
      // Get the canvas element that the context is associated with
      canvas = ctx.canvas;

      // Set the canvas dimensions to the target width and height
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Scale the context to the new dimensions
      ctx.scale(
        targetWidth / canvas.clientWidth,
        targetHeight / canvas.clientHeight
      );
    } else {
      // Create a new canvas element with the target dimensions
      canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the source canvas into the target canvas
      canvas
        .getContext("2d")!
        .drawImage(ctx.canvas, 0, 0, targetWidth, targetHeight);

      // Get a new rendering context for the new canvas
      ctx = canvas.getContext("2d")!;
    }

    return ctx;
  };

  const preprocess = (ctx: CanvasRenderingContext2D) => {
    const base64Image = ctx.canvas.toDataURL("image/jpeg", 0.8);
    sessionStorage.setItem("image", base64Image);

    const resizedCtx = resizeCanvasCtx(
      ctx,
      modelResolution[0],
      modelResolution[1]
    );

    const imageData = resizedCtx.getImageData(
      0,
      0,
      modelResolution[0],
      modelResolution[1]
    );
    const { data, width, height } = imageData;
    // data processing
    const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
    const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [
      1,
      3,
      width,
      height,
    ]);

    ops.assign(
      dataProcessedTensor.pick(0, 0, null, null),
      dataTensor.pick(null, null, 0)
    );
    ops.assign(
      dataProcessedTensor.pick(0, 1, null, null),
      dataTensor.pick(null, null, 1)
    );
    ops.assign(
      dataProcessedTensor.pick(0, 2, null, null),
      dataTensor.pick(null, null, 2)
    );

    ops.divseq(dataProcessedTensor, 255);

    const tensor = new Tensor("float32", new Float32Array(width * height * 3), [
      1,
      3,
      width,
      height,
    ]);

    tensor.data.set(dataProcessedTensor.data);
    return tensor;
  };

  const conf2color = (conf: number) => {
    const r = Math.round(255 * (1 - conf));
    const g = Math.round(255 * conf);
    return `rgb(${r},${g},0)`;
  };

  const postprocess = async (
    tensor: Tensor,
    inferenceTime: number,
    ctx: CanvasRenderingContext2D
  ) => {
    const dx = ctx.canvas.width / modelResolution[0];
    const dy = ctx.canvas.height / modelResolution[1];

    yoloManager.setCameraDimensions(ctx.canvas.width, ctx.canvas.height);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const objects: RecognizedObject[] = [];

    for (let i = 0; i < tensor.dims[0]; i++) {
      //@ts-ignore
      let [batch_id, x0, y0, x1, y1, cls_id, score] = tensor.data.slice(
        i * 7,
        i * 7 + 7
      );
      // scale to canvas size
      [x0, x1] = [x0, x1].map((x: any) => x * dx);
      [y0, y1] = [y0, y1].map((x: any) => x * dy);

      [batch_id, x0, y0, x1, y1, cls_id] = [
        batch_id,
        x0,
        y0,
        x1,
        y1,
        cls_id,
      ].map((x: any) => Math.round(x));

      [score] = [score].map((x: any) => (x * 100).toFixed(0));

      const threshold = highConfidenceClasses.includes(yoloClasses[cls_id])
        ? 70
        : 50;
      if (threshold < 70) {
        continue;
      }

      const label =
        yoloClasses[cls_id].toString()[0].toUpperCase() +
        yoloClasses[cls_id].toString().substring(1);
      // hide percentage as its not relevant to a regular user
      // + " " + score.toString() + "%";
      // color should always be white, but we use opacity to show the confidence
      const color = `rgba(255, 255, 255, ${(score / 100) * 0.5})`;

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      ctx.font = "12px Arial";
      ctx.fillStyle = color;
      ctx.fillText(label, x0, y0 - 5);

      // fillrect with transparent color
      ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);

      const confidence = parseFloat(score);
      if (confidence > threshold) {
        objects.push({
          x0,
          y0,
          x1,
          y1,
          confidence,
          label: yoloClasses[cls_id],
        });
      }
    }
    yoloManager.tick(objects);
  };

  return (
    <ObjectDetectionCamera
      preprocess={preprocess}
      postprocess={postprocess}
      session={session}
      changeModelResolution={changeModelResolution}
      modelName={modelName}
      inferenceTime={0}
    />
  );
}

export default Yolo;
