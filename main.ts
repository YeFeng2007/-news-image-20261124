// The World Today — Tuesday 24 November 2026.
// Entry for make.fun's "Sum up 24 November's world news in one image" bounty.
//
// The front page itself lives in this repository as entry.png, next to this
// file. At grading time this script places an exact copy of that picture in
// the directory the grader points to, so the image being judged is always
// byte-for-byte the one in the repository. No network, no fonts, no drawing
// at run time: the program only moves bytes that are already here.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The picture sits beside this script, wherever the repository is checked out.
const sourcePath = fileURLToPath(new URL("./entry.png", import.meta.url));

// The grader tells us where to put the result; /output is the fallback.
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = `${targetDir}/entry.png`;

if (!existsSync(sourcePath)) {
  throw new Error(`entry.png is missing next to main.ts: ${sourcePath}`);
}

const picture = readFileSync(sourcePath);
mkdirSync(targetDir, { recursive: true });
writeFileSync(targetPath, picture);

console.log(`wrote ${picture.length} bytes to ${targetPath}`);
console.log(`sha256 ${createHash("sha256").update(picture).digest("hex")}`);
