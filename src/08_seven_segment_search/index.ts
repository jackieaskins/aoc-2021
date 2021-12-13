import example from "./example";
import input from "./input";

function part1(arr: string[]): number {
  return arr.reduce(
    (accum, display) =>
      accum +
      display
        .split(" | ")[1]
        .split(" ")
        .filter((digit) => [2, 3, 4, 7].includes(digit.length)).length,
    0
  );
}

/*
 * 1 - Only length 2
 * 4 - Only length 4
 * 7 - Only length 3
 * 8 - Only length 7
 * 3 - Length 5 & has 2 characters not in 7
 * 9 - Length 6 & has 2 characters not in 4
 * 0 - Length 6 & has 3 characters not in 7
 * 6 - Remaining length 6
 * 5 - Length 5 & has 1 character not in 6
 * 2 - Remaining
 */
function part2(arr: string[]): number {
  return arr.reduce((accum, display) => {
    const [inputDigits, outputDigits] = display
      .split(" | ")
      .map((digits) => digits.split(" "))
      .map((digits) => digits.map((digit) => digit.split("").sort().join("")));

    const finalDigits = Array(10).fill(null);
    const remainingDigits = new Set([...inputDigits, ...outputDigits]);
    const allChars = ["a", "b", "c", "d", "e", "f", "g"];

    function findDigit(
      toFind: number,
      toCompare: number,
      expectedLength: number,
      expectedRemaining: number | null
    ): void {
      remainingDigits.forEach((digit) => {
        if (digit.length !== expectedLength) {
          return;
        }

        if (!expectedRemaining) {
          finalDigits[toFind] = digit;
          return;
        }

        let a = digit;
        let b = finalDigits[toCompare];
        const diff = [];

        allChars.forEach((char) => {
          if (a.startsWith(char) && b.startsWith(char)) {
            a = a.slice(1);
            b = b.slice(1);
          } else if (a.startsWith(char)) {
            a = a.slice(1);
            diff.push(char);
          } else if (b.startsWith(char)) {
            b = b.slice(1);
            diff.push(char);
          }
        });

        if (diff.length === expectedRemaining) {
          finalDigits[toFind] = digit;
        }
      });

      remainingDigits.delete(finalDigits[toFind]);
    }

    const lengthMappings = { 2: 1, 4: 4, 3: 7, 7: 8 };
    remainingDigits.forEach((digit) => {
      const number = lengthMappings[digit.length];
      if (number) {
        finalDigits[number] = digit;
      }
    });
    finalDigits.forEach((digit) => {
      if (digit) {
        remainingDigits.delete(digit);
      }
    });

    findDigit(3, 7, 5, 2);
    findDigit(9, 4, 6, 2);
    findDigit(0, 7, 6, 3);
    findDigit(6, -1, 6, null);
    findDigit(5, 6, 5, 1);
    findDigit(2, -1, 5, null);

    const reverseMap = Object.fromEntries(
      finalDigits.map((digit, index) => [digit, index])
    );
    return (
      accum + parseInt(outputDigits.map((digit) => reverseMap[digit]).join(""))
    );
  }, 0);
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
