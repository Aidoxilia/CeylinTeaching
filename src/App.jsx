import { useMemo, useState } from "react";
import {
  allTopicsLabel,
  modeMeta,
  paperLibrary,
  questionBank,
  sourceTypeMeta,
} from "./data/trainerData";
import { gradeResponse } from "./lib/grading";

function getModeItems(mode) {
  switch (mode) {
    case "official":
      return questionBank.filter(
        (item) => item.sourceType === "official-reference",
      );
    case "pdf":
      return questionBank.filter((item) => Boolean(item.publicPaperUrl));
    case "timed":
      return questionBank.filter(
        (item) => item.sourceType === "selfcheck-only",
      );
    case "model":
      return questionBank.filter((item) => item.sourceType === "model");
    default:
      return [];
  }
}

function getScoreSummary(items, responses) {
  const scoreable = items.filter((item) => item.type !== "selfcheck");
  const correct = scoreable.filter(
    (item) => responses[item.id]?.result?.isCorrect === true,
  ).length;
  const attempted = scoreable.filter(
    (item) => typeof responses[item.id]?.result?.isCorrect === "boolean",
  ).length;

  return {
    total: scoreable.length,
    correct,
    attempted,
  };
}

function getTypeHint(item) {
  switch (item.type) {
    case "mcq":
      return "Choose the option letter shown in the paper.";
    case "short":
      return "Type the short answer exactly as expected.";
    case "numeric":
      return "Enter a number. Scientific notation is accepted.";
    case "keywords":
      return "Write the key scientific ideas. Matching is based on required points.";
    case "selfcheck":
      return "Use the notes box for your own self-check. This mode does not auto-mark.";
    default:
      return "";
  }
}

function App() {
  const [mode, setMode] = useState("official");
  const [selectedTopic, setSelectedTopic] = useState(allTopicsLabel);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const modeItems = useMemo(() => getModeItems(mode), [mode]);
  const topics = useMemo(
    () => [allTopicsLabel, ...new Set(modeItems.map((item) => item.topic))],
    [modeItems],
  );
  const activeTopic = topics.includes(selectedTopic)
    ? selectedTopic
    : allTopicsLabel;
  const visibleItems = useMemo(() => {
    if (activeTopic === allTopicsLabel) {
      return modeItems;
    }

    return modeItems.filter((item) => item.topic === activeTopic);
  }, [activeTopic, modeItems]);
  const scoreSummary = useMemo(
    () => getScoreSummary(visibleItems, responses),
    [responses, visibleItems],
  );
  const currentItem = visibleItems[currentIndex] ?? null;
  const currentResponse = currentItem
    ? (responses[currentItem.id] ?? { input: "", notes: "", result: null })
    : { input: "", notes: "", result: null };

  const selectMode = (nextMode) => {
    setMode(nextMode);
    setSelectedTopic(allTopicsLabel);
    setCurrentIndex(0);
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
  };

  const patchResponse = (id, patch) => {
    setResponses((previous) => ({
      ...previous,
      [id]: {
        ...(previous[id] ?? {}),
        ...patch,
      },
    }));
  };

  const updateAnswer = (value) => {
    if (!currentItem) {
      return;
    }

    patchResponse(currentItem.id, { input: value });
  };

  const checkAnswer = (overrideValue) => {
    if (!currentItem || currentItem.type === "selfcheck") {
      return;
    }

    const input = overrideValue ?? currentResponse.input ?? "";
    const result = gradeResponse(currentItem, input);
    patchResponse(currentItem.id, { input, result });
  };

  const handleOptionPick = (option) => {
    if (!currentItem) {
      return;
    }

    updateAnswer(option);
    checkAnswer(option);
  };

  const clearCurrent = () => {
    if (!currentItem) {
      return;
    }

    patchResponse(currentItem.id, { input: "", notes: "", result: null });
  };

  const sourceMeta = currentItem
    ? sourceTypeMeta[currentItem.sourceType]
    : null;
  const typeHint = currentItem ? getTypeHint(currentItem) : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="overflow-hidden rounded-[2rem] border border-sky-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(12,74,110,0.92),_rgba(8,47,73,0.96))] p-6 shadow-2xl shadow-sky-950/20 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
                BTEC Unit 5 Physics Trainer
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Official paper references, verified answers, and legal summaries
                only.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
                The trainer now separates official references, PDF-supported
                study, timed self-check papers, and clearly labelled model
                revision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-100/70">
                  Official refs
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {
                    questionBank.filter(
                      (item) => item.sourceType === "official-reference",
                    ).length
                  }
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-100/70">
                  PDF links
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {questionBank.filter((item) => item.publicPaperUrl).length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-100/70">
                  Timed only
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {
                    questionBank.filter(
                      (item) => item.sourceType === "selfcheck-only",
                    ).length
                  }
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-100/70">
                  Model items
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {
                    questionBank.filter((item) => item.sourceType === "model")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="rounded-2xl border border-amber-400/25 bg-amber-300/10 px-4 py-3 text-sm text-amber-50 shadow-lg shadow-amber-950/10">
          <span className="font-semibold">★ Notice:</span> This app uses
          official paper references and verified answers where available. Full
          Pearson question text is not copied.
        </div>

        <div className="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">App modes</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Switch between official references, linked PDF study, timed
                    paper practice, and model revision.
                  </p>
                </div>
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">
                  ▣ Modes
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {Object.entries(modeMeta).map(([key, value]) => {
                  const active = key === mode;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectMode(key)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-sky-400/60 bg-sky-400/15 text-white"
                          : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{value.label}</span>
                        <span className="text-sm text-slate-400">
                          {value.icon}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        {value.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur">
              <h2 className="text-lg font-bold text-white">Topic filter</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((topic) => {
                  const active = topic === activeTopic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => selectTopic(topic)}
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        active
                          ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
                          : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Official paper library
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Public study links used by this trainer. Open papers and
                    schemes directly from here.
                  </p>
                </div>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  ★ Library
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {paperLibrary.map((entry) => (
                  <article
                    key={entry.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          {entry.tag}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-white">
                          {entry.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {entry.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-400">
                      {entry.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.paperUrl && (
                        <a
                          href={entry.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
                        >
                          ▣ Open paper
                        </a>
                      )}
                      {entry.markSchemeUrl && (
                        <a
                          href={entry.markSchemeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/15"
                        >
                          ✓ Open mark scheme
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                    {modeMeta[mode].label}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
                    {modeMeta[mode].headline}
                  </h2>
                  <p className="mt-3 text-base text-slate-300">
                    {modeMeta[mode].description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Items
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {visibleItems.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Attempted
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {scoreSummary.attempted}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Correct
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {scoreSummary.correct}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Active topic
                    </p>
                    <p className="mt-2 text-lg font-bold text-white">
                      {activeTopic}
                    </p>
                  </div>
                </div>
              </div>

              {mode === "pdf" && (
                <div className="mt-5 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-50">
                  <span className="font-semibold">▣ PDF Study Mode:</span> Open
                  the paper and answer the referenced question.
                </div>
              )}
            </section>

            {visibleItems.length > 0 && (
              <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/20 backdrop-blur sm:p-5">
                <div className="flex flex-wrap gap-2">
                  {visibleItems.map((item, index) => {
                    const active = currentItem?.id === item.id;
                    const result = responses[item.id]?.result;
                    const statusText =
                      result?.isCorrect === true
                        ? "✓"
                        : result?.isCorrect === false
                          ? "×"
                          : "▣";

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`rounded-full border px-3 py-2 text-sm transition ${
                          active
                            ? "border-sky-400/60 bg-sky-400/15 text-white"
                            : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {statusText} {item.paper} {item.questionRef}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {!currentItem ? (
              <section className="rounded-[1.75rem] border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20">
                <p className="text-lg font-semibold text-white">
                  No items match this mode and topic filter.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Change the topic filter or switch to another mode.
                </p>
              </section>
            ) : (
              <section className="rounded-[2rem] border border-slate-800 bg-[linear-gradient(180deg,_rgba(15,23,42,0.94),_rgba(15,23,42,0.84))] p-5 shadow-2xl shadow-slate-950/30 sm:p-6">
                <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-slate-200">
                        {currentItem.paper}
                      </span>
                      <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-slate-200">
                        {currentItem.paperCode}
                      </span>
                      <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-slate-200">
                        {currentItem.questionRef}
                      </span>
                      <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-slate-200">
                        {currentItem.topic}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 ${sourceMeta.badgeClass}`}
                      >
                        {sourceMeta.icon} {sourceMeta.label}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                      {currentItem.prompt}
                    </h3>
                    <p className="mt-3 text-sm text-slate-400">{typeHint}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                    {currentItem.publicPaperUrl && (
                      <a
                        href={currentItem.publicPaperUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/15"
                      >
                        ▣ Open paper
                      </a>
                    )}
                    {currentItem.officialMarkSchemeUrl && (
                      <a
                        href={currentItem.officialMarkSchemeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/15"
                      >
                        ✓ Open mark scheme
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {currentItem.type === "mcq" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {currentItem.options?.map((option) => {
                        const selected = currentResponse.input === option;
                        const result = currentResponse.result;
                        const isCorrect =
                          Boolean(result) &&
                          option.toUpperCase() === currentItem.correctAnswer;
                        const isWrong =
                          Boolean(result) &&
                          selected &&
                          option.toUpperCase() !== currentItem.correctAnswer;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleOptionPick(option)}
                            className={`rounded-2xl border px-4 py-4 text-left text-base font-semibold transition ${
                              isCorrect
                                ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-100"
                                : isWrong
                                  ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                                  : selected
                                    ? "border-sky-400/50 bg-sky-400/10 text-white"
                                    : "border-slate-700 bg-slate-950/70 text-slate-200 hover:border-slate-500"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span>Option {option}</span>
                              <span className="text-lg">
                                {isCorrect ? "✓" : isWrong ? "×" : "▣"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {currentItem.type === "short" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                        Answer
                      </label>
                      <input
                        value={currentResponse.input ?? ""}
                        onChange={(event) => updateAnswer(event.target.value)}
                        placeholder="Type your short answer"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50"
                      />
                    </div>
                  )}

                  {currentItem.type === "numeric" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                        Numerical answer
                      </label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          value={currentResponse.input ?? ""}
                          onChange={(event) => updateAnswer(event.target.value)}
                          placeholder="Example: 0.885 or 8.85e-1"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50"
                        />
                        {currentItem.unit && (
                          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-300">
                            Unit: {currentItem.unit}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentItem.type === "keywords" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                        Key ideas answer
                      </label>
                      <textarea
                        value={currentResponse.input ?? ""}
                        onChange={(event) => updateAnswer(event.target.value)}
                        rows={6}
                        placeholder="Write the scientific ideas you would include."
                        className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50"
                      />
                    </div>
                  )}

                  {currentItem.type === "selfcheck" && (
                    <div className="space-y-3 rounded-3xl border border-amber-400/25 bg-amber-300/10 p-4">
                      <p className="text-sm text-amber-50">
                        <span className="font-semibold">
                          ★ Timed/self-check only:
                        </span>{" "}
                        Use this space to record what you got right, what you
                        missed, and what to review.
                      </p>
                      <textarea
                        value={currentResponse.notes ?? ""}
                        onChange={(event) =>
                          patchResponse(currentItem.id, {
                            notes: event.target.value,
                          })
                        }
                        rows={8}
                        placeholder="Add your timed-paper notes here."
                        className="w-full rounded-3xl border border-amber-400/20 bg-slate-950/60 px-4 py-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/50"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {currentItem.type !== "mcq" &&
                      currentItem.type !== "selfcheck" && (
                        <button
                          type="button"
                          onClick={() => checkAnswer()}
                          className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/15"
                        >
                          ✓ Check answer
                        </button>
                      )}
                    <button
                      type="button"
                      onClick={clearCurrent}
                      className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
                    >
                      ↺ Clear current response
                    </button>
                  </div>

                  {currentResponse.result &&
                    currentItem.type !== "selfcheck" && (
                      <div
                        className={`rounded-3xl border p-5 ${
                          currentResponse.result.isCorrect === true
                            ? "border-emerald-400/30 bg-emerald-400/10"
                            : currentResponse.result.status === "partial"
                              ? "border-amber-400/30 bg-amber-300/10"
                              : "border-rose-400/30 bg-rose-400/10"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-100">
                            {currentResponse.result.isCorrect === true
                              ? "✓ Correct"
                              : currentResponse.result.status === "partial"
                                ? "▣ Partial"
                                : "× Not yet correct"}
                          </span>
                          {currentResponse.result.matchedCount > 0 && (
                            <span className="text-sm text-slate-200">
                              Matched ideas:{" "}
                              {currentResponse.result.matchedCount}
                              {currentResponse.result.requiredCount
                                ? ` / ${currentResponse.result.requiredCount}`
                                : ""}
                            </span>
                          )}
                        </div>

                        <p className="mt-4 text-base leading-7 text-slate-100">
                          {currentItem.correction}
                        </p>

                        {currentItem.learn && (
                          <p className="mt-3 text-sm text-slate-200">
                            <span className="font-semibold">Learn:</span>{" "}
                            {currentItem.learn}
                          </p>
                        )}
                      </div>
                    )}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-400">
                    Item {visibleItems.length === 0 ? 0 : currentIndex + 1} of{" "}
                    {visibleItems.length}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={() =>
                        setCurrentIndex((index) => Math.max(index - 1, 0))
                      }
                      className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      disabled={currentIndex >= visibleItems.length - 1}
                      onClick={() =>
                        setCurrentIndex((index) =>
                          Math.min(index + 1, visibleItems.length - 1),
                        )
                      }
                      className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
