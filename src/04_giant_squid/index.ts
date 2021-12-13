import { exampleBoards, exampleDraws } from "./example";
import { inputBoards, inputDraws } from "./input";

function generateMappedBoards(
  boards: number[][][]
): Record<number, [number, number]>[] {
  return boards.map((board) =>
    board.reduce((accum, row, rowIndex) => {
      row.forEach((col, colIndex) => {
        accum[col] = [rowIndex, colIndex];
      });
      return accum;
    }, {})
  );
}

function part1(draws: number[], boards: number[][][]): number {
  const mappedBoards = generateMappedBoards(boards);
  const boardRows: number[][] = boards.map(() => [0, 0, 0, 0, 0]);
  const boardCols: number[][] = boards.map(() => [0, 0, 0, 0, 0]);

  for (const draw of draws) {
    for (let i = 0; i < mappedBoards.length; i++) {
      if (mappedBoards[i][draw] == null) {
        continue;
      }

      const [row, col] = mappedBoards[i][draw];
      boardRows[i][row] += 1;
      boardCols[i][col] += 1;
      const { [draw]: other, ...rest } = mappedBoards[i];
      mappedBoards[i] = rest;

      if (boardRows[i][row] >= 5 || boardCols[i][col] >= 5) {
        return (
          Object.keys(mappedBoards[i]).reduce(
            (accum, num) => (accum += parseInt(num)),
            0
          ) * draw
        );
      }
    }
  }

  return 0;
}

function part2(draws: number[], boards: number[][][]): number {
  const unsolvedBoards: Set<number> = new Set(boards.map((_, index) => index));

  const mappedBoards = generateMappedBoards(boards);
  const boardRows: number[][] = boards.map(() => [0, 0, 0, 0, 0]);
  const boardCols: number[][] = boards.map(() => [0, 0, 0, 0, 0]);

  for (const draw of draws) {
    for (let i = 0; i < mappedBoards.length; i++) {
      if (mappedBoards[i][draw] == null) {
        continue;
      }

      const [row, col] = mappedBoards[i][draw];
      boardRows[i][row] += 1;
      boardCols[i][col] += 1;
      const { [draw]: other, ...rest } = mappedBoards[i];
      mappedBoards[i] = rest;

      if (boardRows[i][row] >= 5 || boardCols[i][col] >= 5) {
        if (unsolvedBoards.size === 1 && unsolvedBoards.has(i)) {
          return (
            Object.keys(mappedBoards[i]).reduce(
              (accum, num) => (accum += parseInt(num)),
              0
            ) * draw
          );
        }

        unsolvedBoards.delete(i);
      }
    }
  }

  return 0;
}

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(exampleDraws, exampleBoards));
console.log("Part 2:", part2(exampleDraws, exampleBoards));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(inputDraws, inputBoards));
console.log("Part 2:", part2(inputDraws, inputBoards));
console.log("-----------------------------");
