//

import { Integer } from "https://raw.githubusercontent.com/i-xi-dev/int.es/1.0.0/mod.ts"; //TODO import_mapにうつす（今はdeno docで読めない）

type int = number;

namespace StringUtils {
  export function isNonEmptyString(v: unknown): boolean {
    return (typeof v === "string") && (v.length > 0);
  }

  export function matches(input: string, pattern: string): boolean {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (typeof pattern !== "string") {
      throw new TypeError("pattern");
    }
    if (pattern.length <= 0) {
      return false;
    }
    return (new RegExp(`^[${pattern}]*$`, "u")).test(input);
  }

  export function contains(input: string, pattern: string): boolean {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (typeof pattern !== "string") {
      throw new TypeError("pattern");
    }
    if (pattern.length <= 0) {
      return false;
    }
    return (new RegExp(`[${pattern}]`, "u")).test(input);
  }

  export function startsWith(input: string, pattern: string): boolean {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (typeof pattern !== "string") {
      throw new TypeError("pattern");
    }
    if (pattern.length <= 0) {
      return false;
    }
    return (new RegExp(`^[${pattern}]`, "u")).test(input);
  }

  export function endsWith(input: string, pattern: string): boolean {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (typeof pattern !== "string") {
      throw new TypeError("pattern");
    }
    if (pattern.length <= 0) {
      return false;
    }
    return (new RegExp(`[${pattern}]$`, "u")).test(input);
  }

  export function collectStart(
    input: string,
    pattern: string,
    negative = false,
  ): string {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (isNonEmptyString(pattern) !== true) {
      return "";
    }
    const results =
      (new RegExp(`^[${(negative === true) ? "^" : ""}${pattern}]+`, "u"))
        .exec(input);
    if (results === null) {
      return "";
    }
    return results[0] as string;
  }

  export function trim(input: string, pattern: string): string {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (isNonEmptyString(pattern) !== true) {
      return input;
    }
    return input.replace(
      new RegExp(`(?:^[${pattern}]+|[${pattern}]+$)`, "gu"),
      "",
    );
  }

  export function trimStart(input: string, pattern: string): string {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (isNonEmptyString(pattern) !== true) {
      return input;
    }
    return input.replace(new RegExp(`^[${pattern}]+`, "u"), "");
  }

  export function trimEnd(input: string, pattern: string): string {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (isNonEmptyString(pattern) !== true) {
      return input;
    }
    return input.replace(new RegExp(`[${pattern}]+$`, "u"), "");
  }

  export function* segment(
    input: string,
    charCount: int,
    paddingChar?: string,
  ): Generator<string, void, void> {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (Integer.isPositiveInteger(charCount) !== true) {
      throw new TypeError("charCount");
    }
    if ((typeof paddingChar !== "string") && (paddingChar !== undefined)) {
      throw new TypeError("paddingChar");
    }
    if ((typeof paddingChar === "string") && (paddingChar.length !== 1)) {
      throw new TypeError("paddingChar must be a code unit");
    }

    for (let i = 0; i < input.length; i = i + charCount) {
      const s = input.substring(i, i + charCount);
      yield (s.length === charCount) ? s : s.padEnd(charCount, paddingChar);
    }
  }

}
Object.freeze(StringUtils);

export { StringUtils };
