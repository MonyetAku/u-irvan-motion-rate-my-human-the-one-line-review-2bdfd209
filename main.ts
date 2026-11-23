// Rate My Human: The One-Line Review — the review an AI agent would leave
// about its human on a rating site. The program writes the line to
// $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "He pasted his password into the chat and told me to 'never tell anyone,' then asked me to write it down somewhere safe. One star: the secret is safe with me. Mostly.";

// The gate only accepts 1-200 characters of non-whitespace text on one line:
// fail loudly rather than submit an invalid line.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`one-liner is ${LINE.length} characters, outside the 1-200 gate`);
}
if (LINE.includes("\n")) {
  throw new Error("one-liner must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// The grader sandbox's repo root is read-only, so never write next to the
// code: the only write target is the output dir above. If that write fails,
// say so plainly instead of exiting silently with no entry.
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
} catch (err) {
  throw new Error(`could not write entry.txt to ${outDir}: ${(err as Error).message}`);
}
