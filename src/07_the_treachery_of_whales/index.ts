import example from "./example";
import input from "./input";

function part1(arr: number[]): number {
  return Math.min(
    ...arr.map((_pos, index) =>
      arr.reduce((accum, pos) => accum + Math.abs(index - pos), 0)
    )
  );
}

function part2(arr: number[]): number {
  const costs = Array(Math.max(...arr) - Math.min(...arr) + 1)
    .fill(0)
    .reduce((accum, _val, index) => {
      accum[index] = index === 0 ? 0 : accum[index - 1] + index;
      return accum;
    }, []);

  return Math.min(
    ...arr.map((_pos, index) =>
      arr.reduce((accum, pos) => accum + costs[Math.abs(index - pos)], 0)
    )
  );
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
