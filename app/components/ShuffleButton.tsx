"use client";

import { IconButton } from "./IconButton";

interface ShuffleButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: "sm" | "lg";
}

export function ShuffleButton({ active, onToggle, size }: ShuffleButtonProps) {
  const iconSize = size === "lg" ? 18 : 14;
  return (
    <IconButton label="Shuffle" onClick={onToggle} active={active} size={size}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h3.6c1 0 1.9.5 2.4 1.4L14 17.6c.5.9 1.4 1.4 2.4 1.4H20" />
        <path d="M17 4l3 3-3 3" />
        <path d="M3 18h3.6c1 0 1.9-.5 2.4-1.4L10 15" />
        <path d="M14 9l1-1.6c.5-.9 1.4-1.4 2.4-1.4H20" />
        <path d="M17 20l3-3-3-3" />
      </svg>
    </IconButton>
  );
}
