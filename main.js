class BloomFilter {
  constructor(size, hashFunctions) {
    this.size = size;
    this.bitArray = new Array(size).fill(false);
    this.hashFunctions = hashFunctions;
  }

  add(element) {
    this.hashFunctions.forEach((hashFunction) => {
      const index = hashFunction(element) % this.size;
      this.bitArray[index] = true;
    });
  }

  contains(element) {
    return this.hashFunctions.every((hashFunction) => {
      const index = hashFunction(element) % this.size;
      return this.bitArray[index];
    });
  }
}

const hashFunction1 = (str) => str.charCodeAt(0);
const hashFunction2 = (str) => str.charCodeAt(1);

const bloomFilter = new BloomFilter(10, [hashFunction1, hashFunction2]);

bloomFilter.add("apple");
bloomFilter.add("banana");
bloomFilter.add("orange");

console.log("Contains 'apple': ", bloomFilter.contains("apple"));
console.log("Contains 'grape': ", bloomFilter.contains("grape"));
