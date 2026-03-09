import type { ReactNode } from "react";

export type SummaryType = "short" | "normal" | "bullets";

const options: { value: SummaryType; label: string; icon: ReactNode }[] = [
  {
    value: "short",
    label: "Short",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    value: "normal",
    label: "Normal",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="15" y2="18" />
      </svg>
    ),
  },
  {
    value: "bullets",
    label: "Bullet points",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="9" y1="6" x2="20" y2="6" />
        <line x1="9" y1="12" x2="20" y2="12" />
        <line x1="9" y1="18" x2="20" y2="18" />
        <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

type Props = {
  value: SummaryType;
  onChange: (value: SummaryType) => void;
};

export default function SummaryTypeSelector({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Summary type" className="mt-4 flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 focus-visible:ring-offset-2 ${
            value === option.value
              ? "border border-violet-500 bg-violet-500 text-white shadow-sm"
              : "border border-zinc-300 bg-transparent text-zinc-500 hover:border-violet-400 hover:text-violet-500 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-violet-400 dark:hover:text-violet-400"
          }`}
        >
          <span aria-hidden="true">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
}
