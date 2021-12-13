import example from "./example";
import input from "./input";

function getSumDiffs(sampleSize: number) {
  return (arr: number[]): number => {
    const getSum = (start: number, end: number): number =>
      arr.slice(start, end).reduce((currSum, num) => currSum + num, 0);

    let increases = 0;
    let current = getSum(0, sampleSize);

    for (let i = 1; i < arr.length - sampleSize + 1; i++) {
      const next = getSum(i, i + sampleSize);

      if (next > current) {
        increases++;
      }

      current = next;
    }

    return increases;
  };
}

const part1 = getSumDiffs(1);
const part2 = getSumDiffs(3);

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(example));
console.log("Part 2:", part2(example));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
console.log("-----------------------------");
