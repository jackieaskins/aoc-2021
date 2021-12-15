import { exampleTemplate, exampleRules } from "./example";
import { inputTemplate, inputRules } from "./input";

function addOrExtend(
  obj: Record<string, number>,
  key: string,
  value: number
): void {
  obj[key] = (obj[key] ?? 0) + value;
}

function getDiffAfterNSteps(steps: number) {
  return (template: string, rules: Record<string, string>): number => {
    const countByChar: Record<string, number> = {};

    let currentPairs: Record<string, number> = template
      .split("")
      .reduce((accum, char, index) => {
        addOrExtend(countByChar, char, 1);

        const nextChar = template.charAt(index + 1);
        if (nextChar === "") {
          return accum;
        }

        const pair = `${char}${nextChar}`;
        addOrExtend(accum, pair, 1);
        return accum;
      }, {});

    new Array(steps).fill(0).forEach(() => {
      currentPairs = Object.entries(currentPairs).reduce(
        (accum, [pair, count]) => {
          const insertChar = rules[pair];
          addOrExtend(countByChar, insertChar, count);
          addOrExtend(accum, `${pair.charAt(0)}${insertChar}`, count);
          addOrExtend(accum, `${insertChar}${pair.charAt(1)}`, count);
          return accum;
        },
        {}
      );
    });

    const counts = Object.values(countByChar);
    return Math.max(...counts) - Math.min(...counts);
  };
}

const part1 = getDiffAfterNSteps(10);
const part2 = getDiffAfterNSteps(40);

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(exampleTemplate, exampleRules));
console.log("Part 2:", part2(exampleTemplate, exampleRules));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(inputTemplate, inputRules));
console.log("Part 2:", part2(inputTemplate, inputRules));
console.log("-----------------------------");
