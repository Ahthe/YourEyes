import { audioEngine } from "@/controllers/init";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Subtitles() {
  const [log, setLog] = useState<{ time: Date; text: string } | null>();

  useEffect(() => {
    const t = setInterval(() => {
      const latest = audioEngine.logs.getLatest();
      if (log?.time !== latest?.time) setLog(latest || null);
    }, 100);
    return () => clearInterval(t);
  }, [setLog]);

  return (
    <div className="subtitles fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center w-screen">
      <AnimatePresence mode="wait">
        {log && (
          <motion.p
            className="font-mono text-sm my-2 text-center"
            key={log.time.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {log.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
