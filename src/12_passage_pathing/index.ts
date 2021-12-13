import { example1, example2, example3 } from "./example";
import input from "./input";

type Graph = Record<string, string[]>;
type Visits = Record<string, number>;

function createGraph(arr: string[]): Graph {
  return arr.reduce((accum, path) => {
    const [from, to] = path.split("-");
    return {
      ...accum,
      [from]: [...(accum[from] ?? []), to],
      [to]: [...(accum[to] ?? []), from],
    };
  }, {});
}

function getNumVisits(visits: Visits, cave: string): number {
  return visits[cave] ?? 0;
}

function getPaths(
  graph: Graph,
  visits: Visits,
  cave: string,
  path: string,
  shouldExploreCave: (cave: string, visits: Visits) => boolean
): string[] {
  if (cave === "end") {
    return [path];
  }

  return (graph[cave] || [])
    .filter((dest) => shouldExploreCave(dest, visits))
    .flatMap((dest) =>
      getPaths(
        graph,
        dest.toLowerCase() !== dest
          ? visits
          : { ...visits, [dest]: getNumVisits(visits, dest) + 1 },
        dest,
        `${path}-${dest}`,
        shouldExploreCave
      )
    );
}

function part1(arr: string[]): number {
  return getPaths(
    createGraph(arr),
    { start: 1 },
    "start",
    "start",
    (cave, visits) =>
      cave.toLowerCase() !== cave || getNumVisits(visits, cave) === 0
  ).length;
}

function part2(arr: string[]): number {
  return getPaths(
    createGraph(arr),
    { start: 1 },
    "start",
    "start",
    (cave, visits) =>
      cave.toLowerCase() !== cave ||
      getNumVisits(visits, cave) === 0 ||
      (Object.values(visits).every((visitCount) => visitCount < 2) &&
        cave !== "start" &&
        cave !== "end")
  ).length;
}

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(example1), part1(example2), part1(example3));
console.log("Part 2:", part2(example1), part2(example2), part2(example3));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
console.log("-----------------------------");
