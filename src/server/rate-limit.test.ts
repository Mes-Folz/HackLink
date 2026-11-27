import { describe, expect, it } from "vitest";
import { clientIpFromHeaders, rateLimitAllowed } from "./rate-limit-policy";

describe("rate-limit policy", () => {
  it("allows attempts through the limit and rejects the next attempt", () => {
    expect(rateLimitAllowed(10, 10)).toBe(true);
    expect(rateLimitAllowed(11, 10)).toBe(false);
  });

  it("uses only a valid proxy IP value", () => {
    expect(clientIpFromHeaders(null, "203.0.113.8, 10.0.0.1")).toBe("203.0.113.8");
    expect(clientIpFromHeaders(null, "not-an-ip")).toBe(null);
  });
});
