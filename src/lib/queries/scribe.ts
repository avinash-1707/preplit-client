import { useQueryClient } from "@tanstack/react-query";
import { qk } from "../queryKeys";
import { getData } from "../http";
import { scribeTokenSchema, type ScribeToken } from "@/contract";

// Server token TTL is ~15 min; treat as fresh for 14 min so we refetch with a
// comfortable margin. Replaces the old hand-rolled cache in
// utils/fetchTokenFromServer.
const SCRIBE_TOKEN_STALE_MS = 14 * 60_000;

export function scribeTokenQueryOptions() {
  return {
    queryKey: qk.scribe.token(),
    queryFn: async (): Promise<ScribeToken> =>
      scribeTokenSchema.parse(await getData<unknown>("/scribe-token")),
    staleTime: SCRIBE_TOKEN_STALE_MS,
    gcTime: Infinity,
  };
}

/**
 * Imperative scribe-token fetcher backed by the Query cache: returns a cached
 * token while fresh and dedupes concurrent requests, replacing the previous
 * bespoke cache/inflight logic.
 */
export function useScribeTokenFetcher() {
  const queryClient = useQueryClient();
  return () => queryClient.fetchQuery(scribeTokenQueryOptions());
}
