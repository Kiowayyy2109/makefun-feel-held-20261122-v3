import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Your head rests in someone's lap, heavy in a way they do not mind. " +
  "A hand moves slowly through your hair, finding the same place again. " +
  "Their breathing rises and falls, keeping time. " +
  "You do not have to hold your head up anymore. " +
  "They are holding it, and the evening can wait.";

function validateEntry(text: string): number {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(`entry must be 1-280 code points, got ${codePoints}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return codePoints;
}

function writeEntry(text: string, outDir: string): string {
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== text) {
    throw new Error("entry.txt does not match the entry text byte-for-byte");
  }
  return outPath;
}

validateEntry(TEXT);
writeEntry(TEXT, process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
