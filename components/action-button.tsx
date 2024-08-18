import { audioEngine, decisionEngine } from "@/controllers/init";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

// Importing Howl from howler.js
export function ActionButton() {
  const bind = useSwipeable({
    onSwipedUp: () => {
      console.log("swiped up");
      new Howl({
        src: ["/audio/analyse.mp3"],
      }).play();
      decisionEngine.visionInference(true);
    },
    onSwipedDown: () => {
      console.log("swiped down");
      new Howl({
        src: ["/audio/dismiss.mp3"],
      }).play();
      audioEngine.ignore();
    },
  });

  return (
    <div className="fixed bottom-32 left-0 right-0 mb-4 w-screen flex items-center justify-center h-64 z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="h-72 w-72 rounded-full border-2 border-opacity-20 border-white flex items-center justify-center"
      >
        <button
          {...bind}
          className="h-64 w-64 rounded-full border-2 border-white touch-none"
        />
      </motion.div>
    </div>
  );
}
