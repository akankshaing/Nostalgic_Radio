const links = [
  {
    label: "GitHub",
    href: "https://github.com/akankshaing",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.18v3.23c0 .3.21.65.79.54A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akanksha-singh/",
    path: "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.98 1.98 0 1 0 5.25 7a1.98 1.98 0 0 0 0-4ZM20.44 13.41c0-3.46-1.85-5.07-4.32-5.07-1.99 0-2.88 1.1-3.38 1.87V8.5H9.36V20h3.38v-6.41c0-1.69.32-3.35 2.43-3.35 2.08 0 2.1 1.96 2.1 3.46V20h3.37v-6.59Z",
  },
  {
    label: "Portfolio",
    href: "https://your-portfolio-link.com",
    path: "M4 4h16v16H4V4Zm3 3h10v2H7V7Zm0 4h10v2H7v-2Zm0 4h6v2H7v-2Z",
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2.5">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          title={link.label}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink)]/80 transition hover:bg-white/10 hover:text-[var(--color-ink)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={link.path} />
          </svg>
        </a>
      ))}

      <span className="ml-1 text-[11px] font-medium text-[var(--color-ink)]/60 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
        by Akanksha Singh
      </span>
    </div>
  );
}
