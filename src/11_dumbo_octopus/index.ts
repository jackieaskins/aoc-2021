import example from "./example";
import input from "./input";

const FLASH_LEVEL = 10;

function processStep(arr: number[][]): number[][] {
  const toVisit = [];

  arr = arr.map((row, y) =>
    row.map((col, x) => {
      if (col + 1 >= FLASH_LEVEL) {
        toVisit.push([y, x]);
      }
      return col + 1;
    })
  );

  while (toVisit.length) {
    const [y, x] = toVisit.pop();

    if (arr[y][x] > FLASH_LEVEL) {
      return;
    }

    [
      [y - 1, x - 1],
      [y - 1, x],
      [y - 1, x + 1],
      [y, x - 1],
      [y, x + 1],
      [y + 1, x - 1],
      [y + 1, x],
      [y + 1, x + 1],
    ].forEach(([nextY, nextX]) => {
      const level = arr[nextY]?.[nextX];
      if (level == undefined || level >= FLASH_LEVEL) {
        return;
      }
      arr[nextY][nextX]++;
      if (arr[nextY][nextX] === FLASH_LEVEL) {
        toVisit.push([nextY, nextX]);
      }
    });
  }

  return arr.map((row) => row.map((col) => (col >= FLASH_LEVEL ? 0 : col)));
}

function part1(arr: number[][]): number {
  const numSteps = 100;
  let stepResult = arr;
  let numFlashes = 0;

  for (let step = 0; step < numSteps; step++) {
    stepResult = processStep(stepResult);

    numFlashes += stepResult.reduce(
      (accum, row) =>
        accum + row.reduce((accum, col) => accum + (col === 0 ? 1 : 0), 0),
      0
    );
  }

  return numFlashes;
}

function part2(arr: number[][]): number {
  let stepResult = arr;
  let numSteps = 0;

  do {
    numSteps++;
    stepResult = processStep(stepResult);
  } while (stepResult.some((row) => row.some((col) => col !== 0)));

  return numSteps;
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
