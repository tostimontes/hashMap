function restrictIndex(index) {
  if (index < 0 || index >= buckets.length) {
    throw new Error('Trying to access index out of bound');
  }
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
  let capacity = 16;
  let hashMap = Array(capacity);
  let numberOfElements = 0;
  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }
  function copyToNewMap(copyKey, copyValue, newMap) {
    const hashCode = hash(copyKey);
    if (!newMap[hashCode]) {
      const newEntry = { key: copyKey, value: copyValue };
      newMap[hashCode] = newEntry;
    } else {
      checkNext(newMap[hashCode], copyKey, copyValue);
    }
  }

  function resize() {
    const newCapacity = capacity * 2;
    const newHashMap = Array(newCapacity);
    capacity = newCapacity;
    hashMapObject
      .entries()
      .forEach((entry) => copyToNewMap(entry[0], entry[1], newHashMap));

    hashMap = newHashMap;
  }

  const hashMapObject = {
    set(key, value) {
      const loadFactor = numberOfElements / capacity;

      // Check if map load is above threshold and create new hash map
      if (loadFactor > 0.75) {
        resize();
      }

      const hashCode = hash(key);
      if (!hashMap[hashCode]) {
        const newEntry = { key, value };
        hashMap[hashCode] = newEntry;
      } else {
        checkNext(hashMap[hashCode], key, value);
      }
      numberOfElements += 1;
    },

    get(key) {
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
    },

    has(key) {
      return !!this.get(key);
    },

    remove(key) {
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
            numberOfElements -= 1;
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
    },

    count() {
      let total = 0;
      hashMap.forEach((bucket) => {
        let currentBucket = bucket;
        while (currentBucket) {
          if (currentBucket.key) {
            total += 1;
          }
          currentBucket = currentBucket.next;
        }
      });
      return total;
    },

    clear() {
      hashMap = Array(capacity);
      numberOfElements = 0;
    },

    keys() {
      const keysArray = [];
      hashMap.forEach((bucket) => {
        let currentBucket = bucket;
        while (currentBucket) {
          if (currentBucket.key) {
            keysArray.push(currentBucket.key);
          }
          currentBucket = currentBucket.next;
        }
      });
      return keysArray;
    },

    values() {
      const valuesArray = [];
      hashMap.forEach((bucket) => {
        let currentBucket = bucket;
        while (currentBucket) {
          if (currentBucket.value) {
            valuesArray.push(currentBucket.value);
          }
          currentBucket = currentBucket.next;
        }
      });
      return valuesArray;
    },

    entries() {
      const entriesArray = [];
      hashMap.forEach((bucket) => {
        let currentBucket = bucket;
        while (currentBucket) {
          if (currentBucket) {
            entriesArray.push([currentBucket.key, currentBucket.value]);
          }
          currentBucket = currentBucket.next;
        }
      });
      return entriesArray;
    },
  };
  return hashMapObject;
}
