import example from "./example";
import input from "./input";

function binaryToDecimal(binary: string | string[]): number {
  const binaryArr = typeof binary === "string" ? binary.split("") : binary;
  return binaryArr.reverse().reduce((accum, char, index) => {
    if (char === "1") {
      accum += Math.pow(2, index);
    }

    return accum;
  }, 0);
}

function part1(arr: string[]): number {
  const counts = [];

  arr.forEach((word) => {
    word.split("").forEach((char, index) => {
      counts[index] = (counts[index] ?? 0) + (char === "0" ? -1 : 1);
    });
  });

  const gamma = binaryToDecimal(counts.map((count) => (count < 0 ? "0" : "1")));
  const epsilon = Math.pow(2, counts.length) - gamma - 1;

  return gamma * epsilon;
}

function findWord(
  arr: string[],
  comparator: (count: number) => boolean
): string {
  return arr.reduce(
    (accum, _char, index) => {
      if (accum.length === 1) {
        return accum;
      }

      const count = accum.reduce(
        (currCount, word) => (currCount += word.charAt(index) === "0" ? -1 : 1),
        0
      );
      const expected = comparator(count) ? "0" : "1";

      return accum.filter((word) => word.charAt(index) === expected);
    },
    [...arr]
  )[0];
}

function part2(arr: string[]): number {
  const oxygen = binaryToDecimal(findWord(arr, (count) => count < 0));
  const co2 = binaryToDecimal(findWord(arr, (count) => count >= 0));

  return oxygen * co2;
}

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(example));
console.log("Part 2:", part2(example));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
console.log("-----------------------------");
