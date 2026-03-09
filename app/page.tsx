"use client";

import { useState } from "react";
import SummarizeButton from "./components/SummarizeButton";
import SummaryCard from "./components/SummaryCard";
import SummaryTypeSelector, { SummaryType } from "./components/SummaryTypeSelector";

export default function Home() {
  const [text, setText] = useState("");
  const [summaryType, setSummaryType] = useState<SummaryType>("normal");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset result when type changes
  function handleTypeChange(type: SummaryType) {
    setSummaryType(type);
    setSummary("");
    setHasError(false);
  }

  async function handleSummarize() {
    setLoading(true);
    setHasError(false);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type: summaryType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();
      setSummary(data.summary);
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  // What to show in the bottom section
  const showEmpty = !summary && !loading && !hasError;

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 px-4 pt-16 font-sans dark:bg-black">
      <div className="w-2/3">
        <h1 className="mb-6 text-center text-2xl font-bold text-zinc-500">
          AI Text Summarizer
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          rows={10}
          aria-label="Text to summarize"
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />

        <SummaryTypeSelector value={summaryType} onChange={handleTypeChange} />

        <div className="mt-6 flex justify-center">
          <SummarizeButton
            onClick={handleSummarize}
            loading={loading}
            disabled={!text.trim()}
          />
        </div>

        {/* Empty state — before first result */}
        {showEmpty && (
          <div className="mt-6 rounded-xl border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700">
            <p className="text-sm text-zinc-500">Your summary will appear here</p>
          </div>
        )}

        {hasError && (
          <p role="alert" className="mt-6 text-center text-sm text-red-600">
            Could not generate summary. Please try again.
          </p>
        )}

        {summary && <SummaryCard summary={summary} type={summaryType} />}
      </div>
    </div>
  );
}
