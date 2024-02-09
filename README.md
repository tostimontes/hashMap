# HashMap

This project is part of the JavaScript curriculum from The Odin Project. It involves creating a custom implementation of a HashMap, a common data structure used in software development.

## Overview

The implementation covers essential methods such as `set`, `get`, `remove`, `clear`, and others, along with handling collisions and dynamic resizing.

## Features

- **Hashing Functionality:** Converts keys into hash codes to store them in the hash table. I used the function provided in the course.
- **Collision Handling:** Uses linked lists to handle hash collisions. I implemented Doubly Linked Lists for easier repositiong of items after removal of one of them.
- **Dynamic Resizing:** Increases the capacity of the hash table when the load factor exceeds a threshold.
- **Basic CRUD Operations:** Includes methods for adding (`set`), retrieving (`get`), checking existence (`has`), and removing (`remove`) key-value pairs.
- **Utility Functions:** Additional methods like `count`, `clear`, `keys`, `values`, and `entries` for various operations.

## Implementation Details

### Key Components

- **`createHashMap` Function:** The factory function that initializes and returns a hashMap object.
- **`hash` Function:** A hashing function that takes a key and converts it into an integer hash code.
- **`resize` Function:** Resizes the hashMap when the load factor exceeds 75%.
- **`copyToNewMap` Function:** Helper function for copying elements to a new hashMap during resizing.

### Methods

- **`set(key, value)`**: Adds or updates a key-value pair in the hashMap.
- **`get(key)`**: Retrieves the value associated with a key.
- **`has(key)`**: Checks if a key exists in the hashMap.
- **`remove(key)`**: Removes a key-value pair from the hashMap.
- **`count()`**: Returns the number of elements in the hashMap.
- **`clear()`**: Clears all key-value pairs from the hashMap.
- **`keys()`**: Returns an array of all keys in the hashMap.
- **`values()`**: Returns an array of all values in the hashMap.
- **`entries()`**: Returns an array of all key-value pairs in the hashMap.

### Collision Handling

Collisions are handled using linked lists. Each bucket in the hashMap can store a linked list of elements that share the same hash code.

### Resizing Logic

When the load factor (ratio of the number of elements to the hashMap capacity) exceeds 75%, the hashMap is resized. The capacity is doubled, and all existing elements are rehashed and placed in the new hashMap.

## Usage

```javascript
const hashTable = createHashMap();
hashTable.set('key1', 'value1');
console.log(hashTable.get('key1')); // Output: 'value1'
```

## Conclusion

This JavaScript HashMap implementation provides a fundamental understanding of how hash tables work, including key operations, collision handling, and dynamic resizing. It is a part of the learning curriculum of The Odin Project and serves as a practical example of implementing data structures in JavaScript.

---
