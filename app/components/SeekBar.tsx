"use client";

import { useCallback, useRef } from "react";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
}

export function SeekBar({ currentTime, duration, onSeek }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  const handleSeek = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el || duration <= 0) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      onSeek(ratio * duration);
    },
    [duration, onSeek]
  );

  return (
    <div
      ref={trackRef}
      className="group relative flex h-6 w-full cursor-pointer items-center"
      onClick={(e) => handleSeek(e.clientX)}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={currentTime}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onSeek(Math.min(currentTime + 5, duration));
        if (e.key === "ArrowLeft") onSeek(Math.max(currentTime - 5, 0));
      }}
    >
      <div className="seek-track relative w-full overflow-visible">
        <div
          className="seek-fill absolute left-0 top-0"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="seek-knob absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--color-ink)] opacity-0 transition-opacity group-hover:opacity-100"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
