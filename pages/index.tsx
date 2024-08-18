import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Save() {
  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator?.standalone ||
      // @ts-ignore
      window.clientInformation.standalone
    ) {
      window.location.href = "/app";
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="h-screen w-screen flex items-center justify-center flex-col"
    >
      <img
        src="/icon512_maskable.png"
        className="h-32 w-32 rounded-lg border-white border-4"
      />
      <h1 className="text-white text-4xl mt-4">visionarypath</h1>
      <p className="text-white text-lg mt-4 text-center">
        Real-time audio descriptions for the visually impaired, fostering
        independence and safety.
      </p>

      <div className="flex flex-col items-center justify-center">
        <div className="mt-4 text-sm text-center p-4">
          We recommend saving this app to your home screen for the best
          experience. Saved apps will launch visionarypath automatically.
          Alternatively, you can use the app in your browser by clicking the
          button below.
        </div>
        <a
          href="/app"
          className="bg-white text-black p-2 rounded-lg mt-4 font-mono"
        >
          Start seeing
        </a>
      </div>
    </motion.div>
  );
}
