"use client";

interface VinylProps {
  isPlaying: boolean;
  size: number;
}

export function Vinyl({ isPlaying, size }: VinylProps) {
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 35% 30%, #3a2a52 0%, #241a3a 38%, #150f24 70%, #0c0817 100%)",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 2px 6px rgba(0,0,0,0.6)",
        animation: "spin 8s linear infinite",
        animationPlayState: isPlaying ? "running" : "paused",
      }}
    >
      {/* grooves */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 5px)",
        }}
      />
      {/* label */}
      <div
        className="absolute inset-[30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, var(--color-accent) 70%, #b8763a 100%)",
        }}
      />
      {/* spindle hole */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}
