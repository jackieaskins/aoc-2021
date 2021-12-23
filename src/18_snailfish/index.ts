import { example1, example2 } from "./example";
import input from "./input";

type NumberOrArray = number | NumberOrArray[];
type NodeOrNumber = Node | number;

class Node {
  public left: NodeOrNumber;
  public right: NodeOrNumber;
  public parent: Node | null;

  constructor(left: NodeOrNumber, right: NodeOrNumber, parent?: Node) {
    if (typeof left !== "number") {
      left.parent = this;
    }
    if (typeof right !== "number") {
      right.parent = this;
    }

    this.left = left;
    this.right = right;
    this.parent = parent ?? null;
  }

  private toArray(): NumberOrArray {
    return [
      typeof this.left === "number" ? this.left : this.left.toArray(),
      typeof this.right === "number" ? this.right : this.right.toArray(),
    ];
  }

  public toString(): string {
    return JSON.stringify(this.toArray());
  }
}

function parsePairs(pairs: NumberOrArray[]): Node {
  const [left, right] = pairs;

  return new Node(
    typeof left === "number" ? left : parsePairs(left),
    typeof right === "number" ? right : parsePairs(right)
  );
}

function findNodeToExplode(pair: NodeOrNumber, depth: number): Node | null {
  if (typeof pair === "number") {
    return null;
  }

  if (depth === 4) {
    return pair;
  }

  return (
    findNodeToExplode(pair.left, depth + 1) ??
    findNodeToExplode(pair.right, depth + 1)
  );
}

function findNodeToSplit(pair: NodeOrNumber): Node | null {
  if (typeof pair === "number") {
    return null;
  }

  if (typeof pair.left === "number" && pair.left >= 10) {
    return pair;
  }

  const leftSplit = findNodeToSplit(pair.left);
  if (leftSplit) {
    return leftSplit;
  }

  if (typeof pair.right === "number" && pair.right >= 10) {
    return pair;
  }

  return findNodeToSplit(pair.right);
}

function increaseNeighbor(pair: Node, direction: "right" | "left"): void {
  const otherDirection = direction === "right" ? "left" : "right";
  const value = pair[direction];

  if (typeof value !== "number") {
    return;
  }

  const { parent } = pair;
  if (!parent) {
    return;
  }

  let currNode: Node;
  if (parent[otherDirection] === pair) {
    if (typeof parent[direction] === "number") {
      (parent[direction] as number) += value;
      return;
    }
    currNode = parent[direction] as Node;
  } else {
    currNode = pair;
    while (currNode?.parent?.[direction] === currNode) {
      currNode = currNode.parent;
    }
    currNode = currNode?.parent;
    if (typeof currNode?.[direction] === "number") {
      (currNode[direction] as number) += value;
      return;
    }
    currNode = currNode?.[direction] as Node;
  }

  if (!currNode) {
    return;
  }

  while (typeof currNode[otherDirection] !== "number") {
    currNode = currNode[otherDirection] as Node;
  }
  (currNode[otherDirection] as number) += value;
}

function reducePair(pair: Node): Node {
  const explode = findNodeToExplode(pair, 0);
  if (explode) {
    const { parent } = explode;

    increaseNeighbor(explode, "left");
    increaseNeighbor(explode, "right");

    if (parent.left === explode) {
      parent.left = 0;
    } else {
      parent.right = 0;
    }

    return reducePair(pair);
  }

  const split = findNodeToSplit(pair);
  if (split) {
    const { left, right } = split;
    if (typeof left === "number" && left >= 10) {
      split.left = new Node(Math.floor(left / 2), Math.ceil(left / 2), split);
    } else if (typeof right === "number" && right >= 10) {
      split.right = new Node(
        Math.floor(right / 2),
        Math.ceil(right / 2),
        split
      );
    }

    return reducePair(pair);
  }

  return pair;
}

function calculateMagnitude(pair: NodeOrNumber): number {
  if (typeof pair === "number") {
    return pair;
  }

  return 3 * calculateMagnitude(pair.left) + 2 * calculateMagnitude(pair.right);
}

function part1(pairs: NumberOrArray[][]): number {
  const [firstPair, ...otherPairs] = pairs.map(parsePairs);

  const sum = otherPairs.reduce(
    (sum, pair) => reducePair(new Node(sum, pair)),
    firstPair
  );

  return calculateMagnitude(sum);
}

function part2(pairs: NumberOrArray[][]): number {
  let max = 0;

  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < pairs.length; j++) {
      const magnitude = calculateMagnitude(
        reducePair(new Node(parsePairs(pairs[i]), parsePairs(pairs[j])))
      );
      max = Math.max(max, magnitude);
    }
  }

  return max;
}

console.log("-----------------------------");
console.log("Example");
console.log("Part 1-1:", part1(example1));
console.log("Part 1-2:", part1(example2));
console.log("Part 2:", part2(example2));
console.log("-----------------------------");
console.log("Input");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
console.log("-----------------------------");
