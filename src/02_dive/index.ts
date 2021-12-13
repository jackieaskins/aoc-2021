import example from "./example";
import input from "./input";

type Input = {
  direction: string;
  distance: number;
};

function part1(arr: Input[]) {
  let position = 0;
  let depth = 0;

  arr.forEach(({ direction, distance }) => {
    switch (direction) {
      case "forward":
        position += distance;
        break;
      case "up":
        depth -= distance;
        break;
      case "down":
        depth += distance;
        break;
    }
  });

  return position * depth;
}

function part2(arr: Input[]) {
  let aim = 0;
  let position = 0;
  let depth = 0;

  arr.forEach(({ direction, distance }) => {
    switch (direction) {
      case "forward":
        position += distance;
        depth += aim * distance;
        break;
      case "up":
        aim -= distance;
        break;
      case "down":
        aim += distance;
        break;
    }
  });

  return position * depth;
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
