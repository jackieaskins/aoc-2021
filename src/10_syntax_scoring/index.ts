import example from "./example";
import input from "./input";

const openToCloseMap = { "[": "]", "(": ")", "{": "}", "<": ">" };
const opens = new Set(Object.keys(openToCloseMap));

function part1(arr: string[]): number {
  const pointsMap = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  return arr.reduce((accum, line) => {
    const openStack = [];

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (opens.has(char)) {
        openStack.push(char);
      } else if (
        !openStack.length ||
        openToCloseMap[openStack.pop()] !== char
      ) {
        return accum + pointsMap[char];
      }
    }

    return accum;
  }, 0);
}

function part2(arr: string[]): number {
  const pointsMap = { ")": 1, "]": 2, "}": 3, ">": 4 };
  const scores = arr
    .reduce((accum, line) => {
      const openStack = [];

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (opens.has(char)) {
          openStack.push(char);
        } else if (
          !openStack.length ||
          openToCloseMap[openStack.pop()] !== char
        ) {
          return accum;
        }
      }

      return [
        ...accum,
        openStack
          .reverse()
          .reduce(
            (newAccum, open) => newAccum * 5 + pointsMap[openToCloseMap[open]],
            0
          ),
      ];
    }, [])
    .sort((a, b) => a - b);

  return scores[(scores.length - 1) / 2];
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
