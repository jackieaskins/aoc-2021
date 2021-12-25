import { exampleAlgorithm, exampleImage } from "./example";
import { inputAlgorithm, inputImage } from "./input";

const PAD_SIZE = 1;

function binaryToDecimal(binary: string): number {
  return binary
    .split("")
    .reverse()
    .reduce((accum, char, index) => {
      if (char === "1") {
        accum += Math.pow(2, index);
      }
      return accum;
    }, 0);
}

function padImage(image: string[][], padChar: string): string[][] {
  return new Array(image.length + PAD_SIZE * 2)
    .fill(0)
    .map((_row, rowIndex) =>
      new Array(image[0].length + PAD_SIZE * 2)
        .fill(0)
        .map(
          (_col, colIndex) =>
            image[rowIndex - PAD_SIZE]?.[colIndex - PAD_SIZE] ?? padChar
        )
    );
}

function enhanceImageTimes(times: number) {
  return (algorithm: string, image: string[][]) => {
    let currImage = image;

    for (let i = 0; i < times; i++) {
      const padChar = i % 2 === 1 && algorithm.charAt(0) === "#" ? "#" : ".";
      const paddedImage = padImage(currImage, padChar);

      currImage = paddedImage.map((row, rowIndex) =>
        row.map((_col, colIndex) => {
          const index = binaryToDecimal(
            [
              [rowIndex - 1, colIndex - 1],
              [rowIndex - 1, colIndex],
              [rowIndex - 1, colIndex + 1],
              [rowIndex, colIndex - 1],
              [rowIndex, colIndex],
              [rowIndex, colIndex + 1],
              [rowIndex + 1, colIndex - 1],
              [rowIndex + 1, colIndex],
              [rowIndex + 1, colIndex + 1],
            ]
              .map(([r, c]) => paddedImage[r]?.[c] ?? padChar)
              .map((char) => (char === "." ? "0" : "1"))
              .join("")
          );

          return algorithm.charAt(index);
        })
      );
    }

    return currImage.flat().filter((pixel) => pixel === "#").length;
  };
}

const part1 = enhanceImageTimes(2);
const part2 = enhanceImageTimes(50);

console.log("-----------------------------");
console.log("Example");
console.log("Part 1:", part1(exampleAlgorithm, exampleImage));
console.log("Part 2:", part2(exampleAlgorithm, exampleImage));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(inputAlgorithm, inputImage));
console.log("Part 2:", part2(inputAlgorithm, inputImage));
console.log("-----------------------------");
