import example from "./example";
import input from "./input";

function createArray(size = 9): number[] {
  return Array(size).fill(0);
}

function findFishCountOnDay(lastDay: number) {
  return (initialState: number[]): number => {
    let mappedState = initialState.reduce((accum, timer) => {
      accum[timer] += 1;
      return accum;
    }, createArray());

    for (let day = 1; day <= lastDay; day++) {
      const newFish = mappedState[0];

      mappedState = mappedState.reduce((accum, numFish, index) => {
        const nextIndex = index === 0 ? 6 : index - 1;
        accum[nextIndex] += numFish;
        return accum;
      }, createArray());

      mappedState[8] += newFish;
    }

    return mappedState.reduce((accum, num) => accum + num);
  };
}

const part1 = findFishCountOnDay(80);
const part2 = findFishCountOnDay(256);

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(example));
console.log("Part 2:", part2(example));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
console.log("-----------------------------");
