// SPDX-License-Identifier: MIT
// Entry for make.fun — "The Funniest Office Joke, Judged Head to Head".
// Writes one single-line office joke to /output/entry.txt, nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One line, setup then turn, punchline last. Written for this entry.
const JOKE =
  "The printer jammed on deadline day, so I printed an IT ticket about it — and the ticket jammed too.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const ENTRY_PATH = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  const line = JOKE.trim();
  // The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
  // not only white space. Fail loudly here rather than shipping a bad line.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("joke must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  mkdirSync(dirname(ENTRY_PATH), { recursive: true });
  writeFileSync(ENTRY_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${ENTRY_PATH}`);
}

main();
