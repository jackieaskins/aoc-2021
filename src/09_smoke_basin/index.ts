import example from "./example";
import input from "./input";

function part1(arr: number[][]): number {
  return arr
    .flatMap((row, i) =>
      row.filter((col, j) =>
        [arr[i]?.[j - 1], arr[i]?.[j + 1], arr[i - 1]?.[j], arr[i + 1]?.[j]]
          .filter((val) => val != undefined)
          .every((neighbor) => col < neighbor)
      )
    )
    .reduce((accum, lowPoint) => accum + lowPoint + 1, 0);
}

function part2(arr: number[][]): number {
  const basinSizes = [];
  const visited = Array(arr.length)
    .fill(0)
    .map((_row, i) => Array(arr[i].length).fill(false));

  arr.forEach((row, i) => {
    row.forEach((col, j) => {
      const queue = [];

      if (col === 9) {
        visited[i][j] = true;
      } else {
        queue.push([i, j]);
      }

      let size = 0;

      while (queue.length) {
        const [y, x] = queue.pop();

        if (visited[y][x]) {
          continue;
        }

        visited[y][x] = true;
        size++;

        [
          [y, x + 1],
          [y, x - 1],
          [y + 1, x],
          [y - 1, x],
        ]
          .filter(([nextY, nextX]) => {
            const nextVal = arr[nextY]?.[nextX];
            return nextVal != undefined && nextVal !== 9;
          })
          .filter(([nextY, nextX]) => !visited[nextY][nextX])
          .forEach((next) => queue.push(next));
      }

      if (size > 0) {
        basinSizes.push(size);
      }
    });
  });

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((accum, num) => accum * num, 1);
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
