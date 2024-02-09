function restrictIndex(index) {
  if (index < 0 || index >= buckets.length) {
    throw new Error('Trying to access index out of bound');
  }
}
function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
  }

  return hashCode;
}
function checkNext(obj, key, value) {
  if (obj.key === key) {
    obj.value = value;
    return;
  }
  if (!obj.next) {
    const newNode = { key, value };
    obj.next = newNode;
  } else {
    checkNext(obj.next, key, value);
  }
}

function createHashMap() {
  // apply the modulo operator on each iteration instead of outside the loop at the end
  const hashMap = Array(16);

  const capacity = hashMap.length;
  let numberOfElements = 0;
  const loadFactor = numberOfElements / capacity;
  // TODO: grow buckets size when it needs to, by calculating if your bucket has reached the load factor. Some of the methods in this assignment that are mentioned later could be reused to help you handle that growth logic more easily. So you may want to hold onto implementing your growing functionality just for now. However, the reason why we mention it with set() is because it’s important to grow buckets exactly when they are being expanded.

  hashMap.set = (key, value) => {
    const hashCode = hash(key);
    if (!hashMap[hashCode]) {
      const newEntry = { key, value };
      hashMap[hashCode] = newEntry;
    } else {
      checkNext(hashMap[hashCode], key, value);
    }
    numberOfElements += 1;
  };

  hashMap.get = (key) => {
    // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    // * Create another recursive function that traverses the linked list for the key
    function name(params) {}
    const retrievalBucket = hashMap[hash(key)];
    if (retrievalBucket.key === key) {
      return retrievalBucket.value;
    }
    if (retrievalBucket.next) {
    }
  };

  hashMap.has = (key) => {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
  };

  hashMap.remove = (key) => {
    // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  };

  //   hashMap.length = () => {
  //     // returns the number of stored keys in the hash map.
  //   };

  hashMap.clear = () => {
    // removes all entries
  };

  hashMap.keys = () => {
    // returns an array containing all the keys inside the hash map.
  };

  hashMap.values = () => {
    // returns an array containing all the values.
  };

  hashMap.entries = () => {
    // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  };
  return hashMap;
}

const hashTable = createHashMap();

hashTable.set('Aitor', 'Aizpitarte');
hashTable.set('Aitor', 'Garca');
hashTable.set('iratxe', 'muguruza');
hashTable.set('iratxe', 'apes');
hashTable.set('tixki', 'apes');
hashTable.set('tixik', 'apes');
hashTable.set('tixik', 'ergsdf');
hashTable.set('eneko', 'ergsdf');
hashTable.set('ainhoa', 'ergsdf');
hashTable.set('ama', 'ergsdf');
hashTable.set('aita', 'ergsdf');
console.log(hashTable);
