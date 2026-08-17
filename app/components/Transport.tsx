"use client";

interface TransportProps {
  isPlaying: boolean;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  size?: "sm" | "lg";
}

export function Transport({
  isPlaying,
  onPrev,
  onToggle,
  onNext,
  size = "sm",
}: TransportProps) {
  const playSize = size === "lg" ? "h-14 w-14" : "h-9 w-9";
  const sideSize = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const iconSize = size === "lg" ? 22 : 15;
  const sideIconSize = size === "lg" ? 18 : 13;

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className={`flex ${sideSize} items-center justify-center rounded-full text-[var(--color-ink)]/80 transition hover:bg-white/10 hover:text-[var(--color-ink)] active:scale-95`}
      >
        <svg width={sideIconSize} height={sideIconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 5h2v14H6zM20 5v14L9 12z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onToggle}
        className={`flex ${playSize} items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-dusk)] shadow-[0_4px_16px_-2px_rgba(240,168,98,0.6)] transition active:scale-95`}
      >
        {isPlaying ? (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        ) : (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4l14 8-14 8z" />
          </svg>
        )}
      </button>

      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className={`flex ${sideSize} items-center justify-center rounded-full text-[var(--color-ink)]/80 transition hover:bg-white/10 hover:text-[var(--color-ink)] active:scale-95`}
      >
        <svg width={sideIconSize} height={sideIconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}
