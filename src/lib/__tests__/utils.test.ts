import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility", () => {
  it("merges multiple class strings into one", () => {
    const result = cn("foo", "bar", "baz");
    expect(result).toBe("foo bar baz");
  });

  it("handles conditional classes", () => {
    const condition = true;
    const result = cn("base", condition && "conditional");
    expect(result).toBe("base conditional");

    const falseResult = cn("base", false && "conditional");
    expect(falseResult).toBe("base");
  });

  it("deduplicates conflicting Tailwind classes", () => {
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");

    const result2 = cn("text-red-500", "text-blue-500");
    expect(result2).toBe("text-blue-500");
  });

  it("returns empty string for no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles undefined, null, and false inputs gracefully", () => {
    const result = cn("base", undefined, null, false);
    expect(result).toBe("base");
  });

  it("merges array inputs", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });
});