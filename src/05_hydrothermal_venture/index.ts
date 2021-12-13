import example from "./example";
import input from "./input";

type Input = [[number, number], [number, number]];
type InputArr = Input[];

function generateDiagramOverlap(
  arr: InputArr,
  handler: (diagram: number[][], input: Input) => number[][]
): number {
  const [maxX, maxY] = arr.reduce(
    ([maxX, maxY], [[x1, y1], [x2, y2]]) => [
      Math.max(maxX, x1, x2),
      Math.max(maxY, y1, y2),
    ],
    [0, 0]
  );

  return arr
    .reduce(
      handler,
      Array(maxY + 1)
        .fill(0)
        .map(() => Array(maxX + 1).fill(0))
    )
    .reduce((accum, row) => accum + row.filter((col) => col >= 2).length, 0);
}

function part1(arr: InputArr): number {
  return generateDiagramOverlap(
    arr.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2),
    (diagram, [[x1, y1], [x2, y2]]) => {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          diagram[y][x] += 1;
        }
      }
      return diagram;
    }
  );
}

function part2(arr: InputArr): number {
  return generateDiagramOverlap(arr, (diagram, [[x1, y1], [x2, y2]]) => {
    let x = x1;
    let y = y1;

    diagram[y][x] += 1;

    while (x !== x2 || y !== y2) {
      if (x !== x2) x < x2 ? x++ : x--;
      if (y !== y2) y < y2 ? y++ : y--;

      diagram[y][x] += 1;
    }

    return diagram;
  });
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
