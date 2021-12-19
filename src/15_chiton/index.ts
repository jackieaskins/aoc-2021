import example from "./example";
import input from "./input";
import PriorityQueue from "./PriorityQueue";

function findShortestPath(arr: number[][]): number {
  const getKey = (row: number, col: number) => `${row},${col}`;
  const getNeighbors = (rowIndex: number, colIndex: number) =>
    [
      [rowIndex - 1, colIndex],
      [rowIndex + 1, colIndex],
      [rowIndex, colIndex - 1],
      [rowIndex, colIndex + 1],
    ]
      .filter(([row, col]) => arr[row]?.[col] != null)
      .map(([row, col]) => getKey(row, col));

  const edges: Record<string, string[]> = {};
  const weights: Record<string, number> = {};
  const dists: Record<string, number> = {};
  const toVisit: [string, number][] = [];
  const visited = new Set<string>();

  arr.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const key = getKey(rowIndex, colIndex);
      edges[key] = getNeighbors(rowIndex, colIndex);
      weights[key] = col;
      dists[key] = key === "0,0" ? 0 : Infinity;
      toVisit.push([key, dists[key]]);
    });
  });

  const pq = new PriorityQueue<[string, number]>(
    toVisit,
    (a, b) => a[1] - b[1],
    (node) => node[0]
  );

  while (pq.size() > 0) {
    const vertex = pq.extractMin()[0];

    if (visited.has(vertex)) {
      continue;
    }

    edges[vertex].forEach((neighbor) => {
      if (visited.has(neighbor)) {
        return;
      }
      const dist = dists[vertex] + weights[neighbor];
      if (dist < dists[neighbor]) {
        dists[neighbor] = dist;
        pq.decreaseKey([neighbor, dist]);
      }
    });
  }

  return dists[`${arr.length - 1},${arr[0].length - 1}`];
}

function part1(arr: number[][]): number {
  return findShortestPath(arr);
}

function part2(arr: number[][]): number {
  const newArr = arr.map((row) => row.map((col) => col));

  for (const row of newArr) {
    const length = row.length * 4;
    for (let i = 0; i < length; i++) {
      row.push(row[i] + 1 > 9 ? 1 : row[i] + 1);
    }
  }
  const length = newArr.length * 4;
  for (let i = 0; i < length; i++) {
    newArr.push(newArr[i].map((col) => (col + 1 > 9 ? 1 : col + 1)));
  }

  return findShortestPath(newArr);
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
