"use client";

import type { ReactNode } from "react";

interface IconButtonProps {
  label: string;
  onClick: () => void;
  active?: boolean;
  size?: "sm" | "lg";
  children: ReactNode;
}

export function IconButton({
  label,
  onClick,
  active,
  size = "sm",
  children,
}: IconButtonProps) {
  const dim = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full transition active:scale-95 ${
        active
          ? "bg-[var(--color-accent)] text-[var(--color-dusk)]"
          : "text-[var(--color-ink)]/75 hover:bg-white/10 hover:text-[var(--color-ink)]"
      }`}
    >
      {children}
    </button>
  );
}
