import { test, expect, describe } from "bun:test";
import { readFileSync } from "node:fs";

/**
 * Guard for the state boundary documented in CLAUDE.md: Zustand stores hold UI /
 * transient / realtime state only — never server cache. They must therefore not
 * import the server-fetch layer (axios api, http helpers, or TanStack Query). If
 * a store needs server data, that data belongs in a Query hook instead.
 */
const STORES = ["llmStore.ts", "MicCameraStore.ts", "transcriptStore.ts"];

// Imports that indicate a store is reaching for server state.
const FORBIDDEN = [
  /from\s+["']@\/lib\/api["']/,
  /from\s+["']@\/lib\/http["']/,
  /from\s+["']@\/lib\/queries/,
  /from\s+["']@tanstack\/react-query["']/,
  /from\s+["']axios["']/,
];

describe("zustand store boundary", () => {
  for (const file of STORES) {
    test(`${file} does not import the server-fetch layer`, () => {
      const src = readFileSync(new URL(`./${file}`, import.meta.url), "utf8");
      for (const pattern of FORBIDDEN) {
        expect(src).not.toMatch(pattern);
      }
    });
  }
});
