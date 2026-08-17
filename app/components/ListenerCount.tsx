"use client";

import { useEffect, useState } from "react";

export function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(212 + Math.floor(Math.random() * 40));
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === null) return prev;
        const drift = Math.floor(Math.random() * 7) - 3;
        return Math.max(150, prev + drift);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--color-ink)]/85 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      </span>
      <span className="tabular">{count ?? "—"}</span>
      <span className="text-[var(--color-ink)]/60">listening</span>
    </div>
  );
}
