import { useQuery } from "@tanstack/react-query";
import { qk } from "../queryKeys";
import { getData } from "../http";
import type { UserInsight } from "@/contract";

/** The authenticated user's aggregated insights. */
export function useInsights() {
  return useQuery({
    queryKey: qk.user.insights(),
    queryFn: () => getData<UserInsight>("/api/users/me/insights"),
    staleTime: 5 * 60_000,
  });
}
