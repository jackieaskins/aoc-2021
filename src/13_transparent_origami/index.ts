import { exampleDots, exampleFolds } from "./example";
import { inputDots, inputFolds } from "./input";

function createPaper(height: number, width: number): boolean[][] {
  return new Array(height).fill(0).map(() => new Array(width).fill(false));
}

function foldPaper(dots: number[][], folds: [string, number][]): boolean[][] {
  const [maxX, maxY] = dots.reduce(
    ([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)],
    [0, 0]
  );

  const paper = createPaper(maxY + 1, maxX + 1);
  dots.forEach(([x, y]) => {
    paper[y][x] = true;
  });

  return folds.reduce((currPaper, [foldAxis, foldLine]) => {
    const height = currPaper.length;
    const width = currPaper[0].length;

    if (foldAxis === "y") {
      const newHeight = Math.max(foldLine, height - foldLine - 1);
      return createPaper(newHeight, width).map((row, y) => {
        const top = foldLine - newHeight + y;
        const bottom = foldLine + newHeight - y;
        return row.map(
          (_col, x) => !!currPaper[top]?.[x] || !!currPaper[bottom]?.[x]
        );
      });
    }

    const newWidth = Math.max(foldLine, width - foldLine - 1);
    return createPaper(height, newWidth).map((row, y) =>
      row.map((_col, x) => {
        const left = foldLine - newWidth + x;
        const right = foldLine + newWidth - x;
        return !!currPaper[y][left] || !!currPaper[y][right];
      })
    );
  }, paper);
}

function part1(dots: number[][], folds: [string, number][]): number {
  return foldPaper(dots, [folds[0]]).reduce(
    (accum, row) =>
      accum + row.reduce((newAccum, col) => (col ? newAccum + 1 : newAccum), 0),
    0
  );
}

function part2(dots: number[][], folds: [string, number][]): string {
  return [
    "\n",
    foldPaper(dots, folds)
      .map((row) => row.map((col) => (col ? "#" : " ")).join(""))
      .join("\n"),
  ].join("");
}

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(exampleDots, exampleFolds));
console.log("Part 2:", part2(exampleDots, exampleFolds));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(inputDots, inputFolds));
console.log("Part 2:", part2(inputDots, inputFolds));
console.log("-----------------------------");
