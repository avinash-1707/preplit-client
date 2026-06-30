/**
 * Centralized, typed query-key factory. Every TanStack Query key flows through
 * here so invalidation targets are unambiguous and refactor-safe.
 */
export const qk = {
  interviews: {
    all: ["interviews"] as const,
    list: (page: number, limit: number) =>
      ["interviews", "list", { page, limit }] as const,
    evaluation: (sessionId: string) =>
      ["interviews", "evaluation", sessionId] as const,
  },
  user: {
    insights: () => ["user", "insights"] as const,
  },
  scribe: {
    token: () => ["scribe", "token"] as const,
  },
} as const;
