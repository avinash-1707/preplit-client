import { api } from "./api";
import type { AxiosRequestConfig } from "axios";
import type { ApiSuccess, Pagination } from "@/contract";

/**
 * Thin wrappers around the axios instance that understand the normalized API
 * envelope ({ success, data, pagination? } / { error, code? }). They return the
 * unwrapped `data` so query/mutation functions stay terse, and throw a plain
 * Error carrying the server's message on the error envelope.
 */

function toError(e: unknown): Error {
  const payload = (e as { response?: { data?: { error?: unknown } } })?.response
    ?.data;
  if (payload && typeof payload.error === "string") {
    return new Error(payload.error);
  }
  return e instanceof Error ? e : new Error("Request failed");
}

export async function getData<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const res = await api.get<ApiSuccess<T>>(url, config);
    return res.data.data;
  } catch (e) {
    throw toError(e);
  }
}

export async function getWithPagination<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<{ data: T; pagination?: Pagination }> {
  try {
    const res = await api.get<ApiSuccess<T>>(url, config);
    return { data: res.data.data, pagination: res.data.pagination };
  } catch (e) {
    throw toError(e);
  }
}

export async function postData<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const res = await api.post<ApiSuccess<T>>(url, body, config);
    return res.data.data;
  } catch (e) {
    throw toError(e);
  }
}
