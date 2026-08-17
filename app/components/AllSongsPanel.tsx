"use client";

import { useEffect } from "react";
import { tracks } from "@/lib/tracks";

interface AllSongsPanelProps {
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function AllSongsPanel({
  currentIndex,
  onSelect,
  onClose,
}: AllSongsPanelProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="glass flex max-h-[75vh] w-full flex-col rounded-t-3xl sm:max-w-md sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="text-[14px] font-semibold text-[var(--color-ink)]">
            All songs
            <span className="ml-2 text-[12px] font-normal text-[var(--color-ink)]/55">
              {tracks.length}
            </span>
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink)]/70 transition hover:bg-white/10 hover:text-[var(--color-ink)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {tracks.map((track, i) => {
            const isCurrent = i === currentIndex;
            return (
              <li key={`${track.youtubeId}-${i}`}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/10 ${
                    isCurrent ? "bg-white/10" : ""
                  }`}
                >
                  <span
                    className={`w-4 shrink-0 text-[11px] tabular ${
                      isCurrent
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-ink)]/40"
                    }`}
                  >
                    {isCurrent ? "▸" : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[13.5px] ${
                        isCurrent
                          ? "font-semibold text-[var(--color-accent)]"
                          : "font-medium text-[var(--color-ink)]"
                      }`}
                    >
                      {track.title}
                    </span>
                    <span className="block truncate text-[12px] text-[var(--color-ink)]/60">
                      {track.artist}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
