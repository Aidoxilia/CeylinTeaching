import test from "node:test";
import assert from "node:assert/strict";
import { gradeResponse, parseNumericInput } from "./grading.js";

test("mcq grading accepts letters case-insensitively", () => {
  const result = gradeResponse(
    {
      type: "mcq",
      correctAnswer: "C",
    },
    "c",
  );

  assert.equal(result.isCorrect, true);
});

test("short grading accepts exact answer case-insensitively", () => {
  const result = gradeResponse(
    {
      type: "short",
      answers: ["R"],
    },
    "r",
  );

  assert.equal(result.isCorrect, true);
});

test("numeric parser accepts scientific notation", () => {
  assert.equal(parseNumericInput("8.85e-1"), 0.885);
  assert.equal(parseNumericInput("8.85 x 10^-1"), 0.885);
});

test("numeric grading uses tolerance", () => {
  const result = gradeResponse(
    {
      type: "numeric",
      value: 0.885,
      tolerance: 0.01,
    },
    "0.89",
  );

  assert.equal(result.isCorrect, true);
});

test("keywords grading counts alternative phrases and requiredAny", () => {
  const result = gradeResponse(
    {
      type: "keywords",
      requiredAny: 2,
      required: ["chaotic flow", "eddies", "streamlines cross"],
      alternatives: {
        "chaotic flow": ["random flow"],
        eddies: ["swirls"],
        "streamlines cross": ["layers mix"],
      },
    },
    "The water shows random flow and swirls.",
  );

  assert.equal(result.isCorrect, true);
  assert.equal(result.matchedCount, 2);
});

test("selfcheck mode does not produce a score", () => {
  const result = gradeResponse(
    {
      type: "selfcheck",
    },
    "notes",
  );

  assert.equal(result.isCorrect, null);
  assert.equal(result.status, "selfcheck");
});
