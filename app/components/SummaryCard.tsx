import type { SummaryType } from "./SummaryTypeSelector";

type BulletGroup = {
  title: string;
  points: string[];
};

function parseBulletGroups(text: string): BulletGroup[] {
  const groups: BulletGroup[] = [];
  let current: BulletGroup | null = null;

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("##")) {
      if (current) groups.push(current);
      current = { title: line.replace(/^##\s*/, ""), points: [] };
    } else if (line.startsWith("•") && current) {
      current.points.push(line.replace(/^•\s*/, ""));
    }
  }
  if (current) groups.push(current);
  return groups;
}

type Props = {
  summary: string;
  type: SummaryType;
};

export default function SummaryCard({ summary, type }: Props) {
  const isBullets = type === "bullets";
  const groups = isBullets ? parseBulletGroups(summary) : [];

  return (
    <div role="status" className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
        Summary
      </p>

      {isBullets ? (
        <div className="space-y-4">
          {groups.map((group, i) => (
            <div key={i}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                {group.title}
              </p>
              <ul className="space-y-1.5">
                {group.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-zinc-800 dark:text-zinc-100">
                    <svg aria-hidden="true" className="mt-0.5 shrink-0 text-zinc-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
          {summary}
        </p>
      )}
    </div>
  );
}
