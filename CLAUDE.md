# Preplit client — conventions

## State boundary: TanStack Query vs Zustand

One rule, no overlap:

- **Server cache → TanStack Query.** Anything that is persisted server-side and
  re-fetchable by URL (interviews, evaluations, insights, the scribe token)
  lives in Query. Use the hooks in `src/lib/queries/*` and the key factory in
  `src/lib/queryKeys.ts`. Never copy server responses into a Zustand store.
- **UI / transient / realtime state → Zustand.** Ephemeral client state that is
  not a server row: streaming LLM tokens (`llmStore`), live STT transcript
  (`transcriptStore`), media devices / permissions / `MediaStream` /caption
  toggles (`MicCameraStore`).
- **A store must never hold something that is also a row in the database.** If a
  value arrives over the socket and is ephemeral UI state → Zustand. If it is
  persisted and re-fetchable → Query.

This boundary is enforced by `src/store/store-boundary.test.ts` (stores may not
import the server-fetch layer).

## API contract

`src/contract/` is a **byte-identical mirror** of `server/src/contract/`. The
server repo is the authority — edit there first, then copy the files here
verbatim. Do not let the two copies drift.

## Tooling

- Package manager: **Bun**. Install with `bun add` / `bun add -d`.
- Route protection lives in `src/proxy.ts` (Next.js 16 renamed the `middleware`
  convention to `proxy`). Do not add a `middleware.ts`.
- Checks: `bunx tsc --noEmit && bun run lint && bun test && bun run build`.
