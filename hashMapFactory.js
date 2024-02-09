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
    const newNode = { key, value, previous: obj };
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
    function traverseList(list, searchKey) {
      let currentList = list;
      while (currentList) {
        if (currentList.key === searchKey) {
          return currentList.value;
        }
        currentList = currentList.next;
      }
      return null;
    }

    const retrievalBucket = hashMap[hash(key)];
    if (retrievalBucket === undefined) {
      return null;
    }
    return traverseList(retrievalBucket, key);
  };

  hashMap.has = (key) => {
    return !!hashMap.get(key);
  };

  // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  hashMap.remove = (key) => {
    const retrievalBucket = hashMap[hash(key)];
    const hashCode = hash(key);
    function traverseList(list, searchKey) {
      let previousKey;
      let nextKey;
      let currentList = list;
      // Get the object for removal and its previous and next, if any
      while (currentList) {
        if (currentList.key === searchKey) {
          if (currentList.previous) {
            previousKey = currentList.previous;
          }
          if (currentList.next) {
            nextKey = currentList.next;
          }

          // Remove and reposition previous and next if any
          if (previousKey && nextKey) {
            nextKey.previous = previousKey;
            previousKey.next = nextKey;
          } else if (nextKey && !previousKey) {
            delete nextKey.previous;
            hashMap[hashCode] = nextKey;
          } else if (!nextKey && previousKey) {
            delete previousKey.next;
          } else {
            hashMap[hashCode] = undefined;
          }
          return true;
        }
        currentList = currentList.next;
      }
      return false;
    }
    if (retrievalBucket === undefined) {
      return false;
    }
    return traverseList(retrievalBucket, key);
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
