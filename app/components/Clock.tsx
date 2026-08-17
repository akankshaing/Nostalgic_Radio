"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const interval = setInterval(update, 1000 * 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tabular text-[13px] font-medium tracking-wide text-[var(--color-ink)]/85 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
      {time ?? "--:--"}
    </div>
  );
}
