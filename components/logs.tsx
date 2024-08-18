import { audioEngine } from "@/controllers/init";
import { reverse } from "ramda";
import { useEffect, useState } from "react";

export function Logs() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const t = setInterval(
      () =>
        setLogs(
          reverse(audioEngine.logs.getArray())
            .slice(0, 20)
            .map((l) => l.text)
        ),
      500
    );
    return () => clearInterval(t);
  }, [setLogs]);

  return (
    <div className="bg-black bg-opacity-80">
      {logs.map((log, i) => (
        <p className="font-mono text-sm my-2" key={i}>
          {log}
        </p>
      ))}
    </div>
  );
}
