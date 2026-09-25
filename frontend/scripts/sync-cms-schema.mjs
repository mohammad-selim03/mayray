// Copies the CMS schema (source of truth: frontend/lib/cms/schema) into the admin and backend apps,
// and the default site content (frontend/lib/cms/fixtures) into the backend for `npm run seed`.
// Usage: pnpm cms:sync          write the copies
//        pnpm cms:sync --check  exit 1 if any copy is out of date
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const JOBS = [
  {
    source: path.join(root, "lib/cms/schema"),
    targets: [path.resolve(root, "../admin/src/cms/schema"), path.resolve(root, "../backend/src/cms/schema")],
  },
  {
    source: path.join(root, "lib/cms/fixtures"),
    targets: [path.resolve(root, "../backend/src/cms/fixtures")],
  },
];
const HEADER = "// GENERATED FILE: edit frontend/lib/cms and run `pnpm cms:sync`.\n\n";
const check = process.argv.includes("--check");

function listFiles(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, base);
    return entry.name.endsWith(".ts") ? [path.relative(base, full)] : [];
  });
}

let stale = 0;

for (const { source, targets } of JOBS) {
  const files = listFiles(source).sort();
  const expected = new Map(files.map((f) => [f, HEADER + readFileSync(path.join(source, f), "utf8")]));

  for (const target of targets) {
    if (!existsSync(path.dirname(path.dirname(target)))) {
      console.warn(`skip ${target} (app not found)`);
      continue;
    }

    if (check) {
      const actual = existsSync(target) ? listFiles(target).sort() : [];
      const drift =
        actual.length !== files.length ||
        actual.some((f) => !expected.has(f) || readFileSync(path.join(target, f), "utf8") !== expected.get(f));
      if (drift) {
        stale++;
        console.error(`out of date: ${target}`);
      }
      continue;
    }

    // Update in place (instead of wiping the folder) so dev-server file watchers keep tracking these files.
    let written = 0;
    for (const [file, content] of expected) {
      const dest = path.join(target, file);
      if (existsSync(dest) && readFileSync(dest, "utf8") === content) continue;
      mkdirSync(path.dirname(dest), { recursive: true });
      writeFileSync(dest, content);
      written++;
    }
    const removed = existsSync(target) ? listFiles(target).filter((f) => !expected.has(f)) : [];
    for (const file of removed) rmSync(path.join(target, file));
    console.log(
      `synced ${path.relative(path.resolve(root, ".."), target)}: ${written} updated, ${removed.length} removed, ${files.length} total`
    );
  }
}

if (check && stale) process.exit(1);
