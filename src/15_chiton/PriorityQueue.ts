export default class PriorityQueue<T> {
  private indexMap: Record<string, number> = {};
  private heap: Array<T>;
  private comparator: (a: T, b: T) => number;
  private getKey: (node: T) => string;

  constructor(
    initialHeap: Array<T>,
    comparator: (a: T, b: T) => number,
    getKey: (node: T) => string
  ) {
    this.heap = initialHeap;
    this.comparator = comparator;
    this.getKey = getKey;

    initialHeap.forEach((node, index) => {
      this.indexMap[getKey(node)] = index;
    });
  }

  private swap(indexA: number, indexB: number): void {
    const a = this.heap[indexA];
    const b = this.heap[indexB];

    this.heap[indexA] = b;
    this.indexMap[this.getKey(b)] = indexA;
    this.heap[indexB] = a;
    this.indexMap[this.getKey(a)] = indexB;
  }

  private heapify(index: number): void {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    const leftChild = this.heap[leftChildIndex];
    const rightChild = this.heap[rightChildIndex];

    let smallestIndex = index;
    let smallest = this.heap[index];

    if (leftChild && this.comparator(leftChild, smallest) < 0) {
      smallestIndex = leftChildIndex;
      smallest = leftChild;
    }
    if (rightChild && this.comparator(rightChild, smallest) < 0) {
      smallestIndex = rightChildIndex;
      smallest = rightChild;
    }
    if (smallestIndex !== index) {
      this.swap(smallestIndex, index);
      this.heapify(smallestIndex);
    }
  }

  public size(): number {
    return this.heap.length;
  }

  public decreaseKey(node: T): void {
    let index = this.indexMap[this.getKey(node)];
    this.heap[index] = node;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  public insertKey(node: T): void {
    this.heap.push(node);
    let index = this.size() - 1;
    this.indexMap[this.getKey(node)] = index;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  public extractMin(): T | null {
    if (this.size() === 0) {
      return null;
    }

    const min = this.heap.shift();
    this.indexMap[this.getKey(min)] = undefined;

    if (this.size() > 1) {
      const last = this.heap.pop();
      this.heap.unshift(last);
      this.indexMap[this.getKey(last)] = 0;
      this.heapify(0);
    }
    return min;
  }
}
