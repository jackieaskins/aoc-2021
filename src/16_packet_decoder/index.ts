import {
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
  example7,
} from "./example";
import input from "./input";

export const hexBinaryMap = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

function hexToBinary(hexadecimal: string): string[] {
  return hexadecimal
    .split("")
    .map((char) => hexBinaryMap[char])
    .join("")
    .split("");
}

function spliceBinary(binary: string[], numBits: number): string {
  return binary.splice(0, numBits).join("");
}

function binaryToDecimal(binary: string | string[]): number {
  const binaryArr = typeof binary === "string" ? binary.split("") : binary;
  return binaryArr.reverse().reduce((accum, char, index) => {
    if (char === "1") {
      accum += Math.pow(2, index);
    }

    return accum;
  }, 0);
}

type ParsedPacket = {
  version: number;
  value: number;
  typeId: number;
  subPackets: ParsedPacket[];
};

function parsePacket(packet: string[]): ParsedPacket {
  let value: number;
  const subPackets: ParsedPacket[] = [];
  const version = binaryToDecimal(spliceBinary(packet, 3));
  const typeId = binaryToDecimal(spliceBinary(packet, 3));

  if (typeId === 4) {
    const literalParts = [];
    let lead = "";
    while (lead !== "0") {
      lead = spliceBinary(packet, 1);
      const part = spliceBinary(packet, 4);

      literalParts.push(...part);
    }
    value = binaryToDecimal(literalParts.join(""));
  } else {
    const lengthTypeId = spliceBinary(packet, 1);

    if (lengthTypeId === "0") {
      const totalBitLength = binaryToDecimal(spliceBinary(packet, 15));
      const expectedRemaining = packet.length - totalBitLength;
      while (packet.length > expectedRemaining) {
        subPackets.push(parsePacket(packet));
      }
    } else {
      const numSubPackets = binaryToDecimal(spliceBinary(packet, 11));
      for (let i = 0; i < numSubPackets; i++) {
        subPackets.push(parsePacket(packet));
      }
    }

    if (typeId === 0) {
      value = subPackets.reduce((sum, packet) => sum + packet.value, 0);
    } else if (typeId === 1) {
      value = subPackets.reduce((product, packet) => product * packet.value, 1);
    } else if (typeId === 2) {
      value = Math.min(...subPackets.map(({ value }) => value));
    } else if (typeId === 3) {
      value = Math.max(...subPackets.map(({ value }) => value));
    } else if (typeId === 5) {
      const [{ value: value1 }, { value: value2 }] = subPackets;
      value = value1 > value2 ? 1 : 0;
    } else if (typeId === 6) {
      const [{ value: value1 }, { value: value2 }] = subPackets;
      value = value1 < value2 ? 1 : 0;
    } else if (typeId === 7) {
      const [{ value: value1 }, { value: value2 }] = subPackets;
      value = value1 === value2 ? 1 : 0;
    }
  }

  return { version, typeId, value, subPackets };
}

function part1(hex: string): number {
  const parsedPacket = parsePacket(hexToBinary(hex));
  const getSum = (sum: number, curr: ParsedPacket) =>
    sum + curr.version + curr.subPackets.reduce(getSum, 0);
  return getSum(0, parsedPacket);
}

function part2(hex: string): number {
  const parsedPacket = parsePacket(hexToBinary(hex));
  return parsedPacket.value;
}

console.log("-----------------------------");
console.log("Example");
console.log("Part 1-1:", part1(example1));
console.log("Part 1-2:", part1(example2));
console.log("Part 1-3:", part1(example3));
console.log("Part 1-4:", part1(example4));
console.log("Part 1-5:", part1(example5));
console.log("Part 1-6:", part1(example6));
console.log("Part 1-7:", part1(example7));
console.log("Part 2:", part2(example7));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
console.log("-----------------------------");
