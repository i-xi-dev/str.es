import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Rune } from "../mod.ts";

Deno.test("Rune.isRune(string)", () => {
  assertStrictEquals(Rune.isRune(""), false);
  assertStrictEquals(Rune.isRune("\u0000"), true);
  assertStrictEquals(Rune.isRune("\uFFFF"), true);
  assertStrictEquals(Rune.isRune("a"), true);
  assertStrictEquals(Rune.isRune("あ"), true);
  assertStrictEquals(Rune.isRune("\u{10FFFF}"), true);
  assertStrictEquals(Rune.isRune("\uD800"), true);
  assertStrictEquals(Rune.isRune("\uD800\uDC00"), true);
  assertStrictEquals(Rune.isRune("\uD7FF\uDC00"), false);
  assertStrictEquals(Rune.isRune("aa"), false);
  assertStrictEquals(Rune.isRune("aaa"), false);
});

Deno.test("Rune.isRune(any)", () => {
  assertStrictEquals(Rune.isRune(undefined), false);
  assertStrictEquals(Rune.isRune(1), false);
});

Deno.test("Rune.segment(string, number)", () => {
  assertStrictEquals([...Rune.segment("", 2)].join(","), "");
  assertStrictEquals([...Rune.segment("abc", 2)].join(","), "ab,c");

  assertThrows(
    () => {
      [...Rune.segment(1 as unknown as string, 0)];
    },
    TypeError,
    undefined,
    "input",
  );

  assertThrows(
    () => {
      [...Rune.segment("", 0)];
    },
    TypeError,
    undefined,
    "runeCount",
  );

  assertStrictEquals(
    [...Rune.segment("\u{10000}\u{10001}\u{10002}", 2)].join(","),
    "\u{10000}\u{10001},\u{10002}",
  );
});

Deno.test("Rune.segment(string, number, string)", () => {
  assertStrictEquals([...Rune.segment("", 2, "X")].join(","), "");
  assertStrictEquals([...Rune.segment("abc", 2, "X")].join(","), "ab,cX");

  assertThrows(
    () => {
      [...Rune.segment("", 1, "")];
    },
    TypeError,
    undefined,
    "paddingRune",
  );

  assertThrows(
    () => {
      [...Rune.segment("", 1, "XX")];
    },
    TypeError,
    undefined,
    "paddingRune",
  );
});
