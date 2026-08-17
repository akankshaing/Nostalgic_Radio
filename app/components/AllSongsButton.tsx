"use client";

import { IconButton } from "./IconButton";

interface AllSongsButtonProps {
  onClick: () => void;
  size?: "sm" | "lg";
}

export function AllSongsButton({ onClick, size }: AllSongsButtonProps) {
  const iconSize = size === "lg" ? 18 : 14;
  return (
    <IconButton label="All songs" onClick={onClick} size={size}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="14" y2="18" />
      </svg>
    </IconButton>
  );
}
