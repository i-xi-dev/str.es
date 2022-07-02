//

import { Integer } from "./deps.ts";

type int = number;

namespace Rune {
  export function isRune(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }
    if (value.length > 2) {
      return false;
    }
    const runes = [...value];
    if (runes.length !== 1) {
      return false;
    }
    return true;
  }

  export function* segment(
    input: string,
    runeCount: int,
    paddingRune?: string,
  ): Generator<string, void, void> {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (Integer.isPositiveInteger(runeCount) !== true) {
      throw new TypeError("runeCount");
    }
    if ((typeof paddingRune !== "string") && (paddingRune !== undefined)) {
      throw new TypeError("paddingRune");
    }
    if ((typeof paddingRune === "string") && (paddingRune.length !== 1)) {
      throw new TypeError("paddingRune must be a code point");
    }

    const runes = [...input];
    for (let i = 0; i < runes.length; i = i + runeCount) {
      const s = runes.slice(i, i + runeCount).join("");
      yield ((s.length === runeCount) || (typeof paddingRune !== "string"))
        ? s
        : s.padEnd(runeCount, paddingRune);
    }
  }
}
Object.freeze(Rune);

export { Rune };
