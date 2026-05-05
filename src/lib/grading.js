function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[−–]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeExact(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase();
}

export function parseNumericInput(value) {
  const text = String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/[−–]/g, "-")
    .replace(/×/g, "x")
    .replace(/\s+/g, "");

  if (!text) {
    return Number.NaN;
  }

  if (/^[+-]?\d*\.?\d+(e[+-]?\d+)?$/.test(text)) {
    return Number(text);
  }

  const scientific = text.match(/^([+-]?\d*\.?\d+)x10\^?([+-]?\d+)$/);
  if (scientific) {
    return Number(scientific[1]) * 10 ** Number(scientific[2]);
  }

  return Number.NaN;
}

export function getKeywordMatches(item, answer) {
  const normalizedAnswer = normalizeText(answer);
  const required = item.required ?? [];

  return required.filter((idea) => {
    const candidates = [idea, ...(item.alternatives?.[idea] ?? [])];

    return candidates.some((candidate) => {
      const normalizedCandidate = normalizeText(candidate);
      return (
        normalizedCandidate && normalizedAnswer.includes(normalizedCandidate)
      );
    });
  });
}

export function gradeResponse(item, answer) {
  switch (item.type) {
    case "mcq": {
      const expected = String(item.correctAnswer ?? "")
        .trim()
        .toUpperCase();
      const actual = String(answer ?? "")
        .trim()
        .toUpperCase();
      const isCorrect = actual !== "" && actual === expected;

      return {
        status: isCorrect ? "correct" : "incorrect",
        isCorrect,
        matchedCount: isCorrect ? 1 : 0,
        requiredCount: expected ? 1 : 0,
      };
    }
    case "short": {
      const actual = normalizeExact(answer);
      const accepted = (item.answers ?? []).map((value) =>
        normalizeExact(value),
      );
      const isCorrect = actual !== "" && accepted.includes(actual);

      return {
        status: isCorrect ? "correct" : "incorrect",
        isCorrect,
        matchedCount: isCorrect ? 1 : 0,
        requiredCount: accepted.length,
      };
    }
    case "numeric": {
      const parsed = parseNumericInput(answer);
      const tolerance = item.tolerance ?? 0;
      const isCorrect =
        Number.isFinite(parsed) &&
        Number.isFinite(item.value) &&
        Math.abs(parsed - item.value) <= tolerance;

      return {
        status: isCorrect ? "correct" : "incorrect",
        isCorrect,
        matchedCount: isCorrect ? 1 : 0,
        requiredCount: 1,
      };
    }
    case "keywords": {
      const matched = getKeywordMatches(item, answer);
      const threshold = item.requiredAny ?? (item.required ?? []).length;
      const isCorrect = matched.length >= threshold && threshold > 0;
      const hasAnyMatch = matched.length > 0;

      return {
        status: isCorrect ? "correct" : hasAnyMatch ? "partial" : "incorrect",
        isCorrect,
        matchedCount: matched.length,
        requiredCount: threshold,
        matched,
      };
    }
    case "selfcheck": {
      return {
        status: "selfcheck",
        isCorrect: null,
        matchedCount: 0,
        requiredCount: 0,
      };
    }
    default:
      return {
        status: "incorrect",
        isCorrect: false,
        matchedCount: 0,
        requiredCount: 0,
      };
  }
}
