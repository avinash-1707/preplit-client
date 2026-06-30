import { test, expect, describe } from "bun:test";
import { qk } from "./queryKeys";

describe("query key factory", () => {
  test("interview list key carries pagination params", () => {
    expect(qk.interviews.list(2, 25)).toEqual([
      "interviews",
      "list",
      { page: 2, limit: 25 },
    ]);
  });

  test("all interview keys share the 'interviews' root (invalidation works)", () => {
    expect(qk.interviews.all[0]).toBe("interviews");
    expect(qk.interviews.list(1, 10)[0]).toBe("interviews");
    expect(qk.interviews.evaluation("s1")[0]).toBe("interviews");
  });

  test("evaluation key carries the sessionId", () => {
    expect(qk.interviews.evaluation("s1")).toEqual([
      "interviews",
      "evaluation",
      "s1",
    ]);
  });

  test("user + scribe keys are stable", () => {
    expect(qk.user.insights()).toEqual(["user", "insights"]);
    expect(qk.scribe.token()).toEqual(["scribe", "token"]);
  });
});
