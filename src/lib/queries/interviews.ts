import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { qk } from "../queryKeys";
import { getWithPagination, getData, postData } from "../http";
import type { StartInterviewBody, LogEventBody, Evaluation } from "@/contract";

/** Paginated list of the authenticated user's interview sessions. */
export function useInterviews(page = 1, limit = 10) {
  return useQuery({
    queryKey: qk.interviews.list(page, limit),
    queryFn: () =>
      getWithPagination<unknown[]>(
        `/api/interviews?page=${page}&limit=${limit}`,
      ),
    placeholderData: keepPreviousData,
  });
}

/** A single interview's evaluation; disabled until a sessionId is known. */
export function useEvaluation(sessionId: string | undefined) {
  return useQuery({
    queryKey: qk.interviews.evaluation(sessionId ?? ""),
    queryFn: () =>
      getData<Evaluation>(`/api/interviews/${sessionId}/evaluation`),
    enabled: !!sessionId,
  });
}

export function useStartInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: StartInterviewBody) =>
      postData<unknown>("/api/interviews", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.interviews.all });
    },
  });
}

/** High-frequency event log — fire-and-forget, intentionally no invalidation. */
export function useLogEvent(sessionId: string) {
  return useMutation({
    mutationFn: (body: LogEventBody) =>
      postData<unknown>(`/api/interviews/${sessionId}/events`, body),
  });
}

export function useEndInterview(sessionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postData<Evaluation>(`/api/interviews/${sessionId}/end`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.interviews.evaluation(sessionId),
      });
      queryClient.invalidateQueries({ queryKey: qk.interviews.all });
    },
  });
}
