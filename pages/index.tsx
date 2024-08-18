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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-screen w-screen flex items-center justify-center flex-col bg-black"
    >
      <motion.img
        src="/icon512_maskable.png"
        className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <h1
        className="text-5xl mt-6 font-semibold text-center text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(45deg, #fff, #ffecb3)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
        }}
      >
        Your Eyes
      </h1>
      <p className="text-gray-400 text-xl mt-4 text-center max-w-xl">
        Real-time audio descriptions for the visually impaired, fostering
        independence and safety.
      </p>

      <div className="flex flex-col items-center justify-center mt-6">
        <div className="text-gray-300 text-sm text-center p-4 bg-gray-800 rounded-lg max-w-lg shadow-md">
          We recommend saving this app to your home screen for the best
          experience. Saved apps will launch Your Eyes automatically.
          Alternatively, you can use the app in your browser by clicking the
          button below.
        </div>
        <a
          href="/app"
          className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-4 py-2 rounded-full mt-6 font-mono shadow-lg hover:from-gray-600 hover:to-gray-400 transition-all duration-300 ease-in-out"
        >
          Start seeing
        </a>
      </div>
    </motion.div>
  );
}