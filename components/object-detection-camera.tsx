import { audioGenerator, gptVision } from "@/controllers/init";
import { UserButton, useUser } from "@clerk/nextjs";
import { Tensor } from "onnxruntime-web";
import { HandEye, HandPointing, Info } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { runModel as _runModel } from "../utils";
import { ActionButton } from "./action-button";
import { StartButton } from "./start-button";
import { Subtitles } from "./subtitles";
import { Tutorial } from "./tutorial";

const WebcamComponent = (props: {
  preprocess: (ctx: CanvasRenderingContext2D) => Tensor;
  postprocess: (
    outputTensor: Tensor,
    inferenceTime: number,
    ctx: CanvasRenderingContext2D
  ) => void;
  session: any;
  inferenceTime: number;
  modelName: string;
  changeModelResolution: () => void;
}) => {
  const [inferenceTime, setInferenceTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const webcamRef = useRef<Webcam>(null);
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  const liveDetection = useRef<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [tutorial, setTutorial] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<string>("environment");
  const originalSize = useRef<number[]>([0, 0]);
  const user = useUser();

  useEffect(() => {
    localStorage.getItem("tutorial") === "false" && setTutorial(false);
  }, []);

  const capture = () => {
    const canvas = videoCanvasRef.current!;
    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    })!;

    if (facingMode === "user") {
      context.setTransform(-1, 0, 0, 1, canvas.width, 0);
    }

    context.drawImage(
      webcamRef.current!.video!,
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (facingMode === "user") {
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
    return context;
  };

  const runModel = async (ctx: CanvasRenderingContext2D) => {
    const data = props.preprocess(ctx);
    let outputTensor: Tensor;
    let inferenceTime: number;
    [outputTensor, inferenceTime] = await _runModel(props.session, data);

    props.postprocess(outputTensor, props.inferenceTime, ctx);
    setInferenceTime(inferenceTime);
  };

  const runLiveDetection = async () => {
    if (liveDetection.current) {
      liveDetection.current = false;
      return;
    }
    liveDetection.current = true;
    while (liveDetection.current) {
      const startTime = Date.now();
      const ctx = capture();
      if (!ctx) return;
      await runModel(ctx);
      setTotalTime(Date.now() - startTime);
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      );
    }
  };

  const processImage = async () => {
    reset();
    const ctx = capture();
    if (!ctx) return;

    // create a copy of the canvas
    const boxCtx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    boxCtx.canvas.width = ctx.canvas.width;
    boxCtx.canvas.height = ctx.canvas.height;
    boxCtx.drawImage(ctx.canvas, 0, 0);

    await runModel(boxCtx);
    ctx.drawImage(boxCtx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const reset = async () => {
    var context = videoCanvasRef.current!.getContext("2d")!;
    context.clearRect(0, 0, originalSize.current[0], originalSize.current[1]);
    liveDetection.current = false;
  };

  const [SSR, setSSR] = useState<Boolean>(true);

  const setWebcamCanvasOverlaySize = () => {
    const element = webcamRef.current!.video!;
    if (!element) return;
    var w = element.offsetWidth;
    var h = element.offsetHeight;
    var cv = videoCanvasRef.current;
    if (!cv) return;
    cv.width = w;
    cv.height = h;
  };

  // close camera when browser tab is minimized
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        liveDetection.current = false;
        sessionStorage.removeItem("image");
        window.location.reload();
      }
      // set SSR to true to prevent webcam from loading when tab is not active
      setSSR(document.hidden);
    };
    setSSR(document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (SSR) {
    return <div>Loading...</div>;
  }

  const DevMenu = () => {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-1 flex-row flex-wrap justify-center items-center m-5">
          <div className="flex gap-1 justify-center items-center items-stretch">
            <button
              onClick={async () => {
                const startTime = Date.now();
                await processImage();
                setTotalTime(Date.now() - startTime);
              }}
              className="p-2 border-dashed border-2 rounded-xl hover:translate-y-1 "
            >
              Capture Photo
            </button>
            <button
              onClick={async () => {
                if (liveDetection.current) {
                  liveDetection.current = false;
                } else {
                  runLiveDetection();
                }
              }}
              //on hover, shift the button up
              className={`
          p-2  border-dashed border-2 rounded-xl hover:translate-y-1 
          ${liveDetection.current ? "bg-white text-black" : ""}
          
          `}
            >
              Live Detection
            </button>
          </div>
          <div className="flex gap-1 justify-center items-center items-stretch">
            <button
              onClick={() => {
                reset();
                setFacingMode(facingMode === "user" ? "environment" : "user");
              }}
              className="p-2  border-dashed border-2 rounded-xl hover:translate-y-1 "
            >
              Switch Camera
            </button>
            <button
              onClick={() => {
                reset();
                props.changeModelResolution();
              }}
              className="p-2  border-dashed border-2 rounded-xl hover:translate-y-1 "
            >
              Change Model
            </button>
            <button
              onClick={reset}
              className="p-2  border-dashed border-2 rounded-xl hover:translate-y-1 "
            >
              Reset
            </button>
          </div>
        </div>
        <div>Using {props.modelName}</div>
        <div className="flex gap-3 flex-row flex-wrap justify-between items-center px-5 w-full">
          <div>
            {"Model Inference Time: " + inferenceTime.toFixed() + "ms"}
            <br />
            {"Total Time: " + totalTime.toFixed() + "ms"}
            <br />
            {"Overhead Time: +" + (totalTime - inferenceTime).toFixed(2) + "ms"}
          </div>
          <div>
            <div>
              {"Model FPS: " + (1000 / inferenceTime).toFixed(2) + "fps"}
            </div>
            <div>{"Total FPS: " + (1000 / totalTime).toFixed(2) + "fps"}</div>
            <div>
              {"Overhead FPS: " +
                (1000 * (1 / totalTime - 1 / inferenceTime)).toFixed(2) +
                "fps"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row flex-wrap justify-evenly align-center w-screen h-screen">
      <div
        id="webcam-container"
        className="flex items-center justify-center webcam-container"
      >
        <Webcam
          mirrored={facingMode === "user"}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-screen opacity-50"
          imageSmoothing={true}
          videoConstraints={{
            facingMode: facingMode,
            // width: props.width,
            // height: props.height,
          }}
          onLoadedMetadata={() => {
            setWebcamCanvasOverlaySize();
            originalSize.current = [
              webcamRef.current!.video!.offsetWidth,
              webcamRef.current!.video!.offsetHeight,
            ] as number[];
          }}
          forceScreenshotSourceSize={true}
        />
        <canvas
          id="cv1"
          ref={videoCanvasRef}
          style={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0)",
          }}
        ></canvas>
      </div>
      <div className="absolute z-50">
        <div className="flex font-mono text-sm p-4 w-screen justify-between">
          <button onClick={() => setTutorial(true)}>
            <Info className="h-9 w-9 text-white" />
          </button>
          <button
            onClick={() => {
              gptVision.setCadence(!showButton ? 10 : 20);
              setShowButton((val) => !val);
            }}
          >
            {showButton ? (
              <HandPointing className="h-9 w-9 text-white" />
            ) : (
              <HandEye className="h-9 w-9 text-white" />
            )}
          </button>
          <UserButton />
        </div>
        <div className="mt-4" />
        <Subtitles />
        {!start && (
          <StartButton
            onClick={async () => {
              runLiveDetection();
              setStart(!start);
              new Howl({
                src: ["/audio/start.mp3"],
                volume: 1,
                html5: true,
              }).play();
              // wait 2 seconds
              await new Promise((resolve) => setTimeout(resolve, 2000));
              const name = user.user?.firstName;
              audioGenerator.playText({
                key: "welcome",
                priority: 2,
                voice: "a",
                text: [
                  ...[
                    name
                      ? `Welcome to YourEyes, ${name}.`
                      : "Welcome to YourEyes.",
                  ],
                ].join(" "),
                volume: 1,
              });
              audioGenerator.playText({
                key: "welcome-3",
                priority: 4,
                voice: "a",
                text: "You can swipe up to describe the scene at any time, or swipe down to dismiss the analysis.",
                volume: 1,
              });
            }}
          />
        )}
        {start && showButton && <ActionButton />}
        {tutorial && (
          <Tutorial
            onClose={() => {
              setTutorial(false);
              localStorage.setItem("tutorial", "false");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WebcamComponent;
