# prostrive-nodejs-test

## Problem: Node.js Sort and Manipulate
In the JavaScript file, you have a program that performs a GET request on the route https://coderbyte.com/api/challenges/json/wizard-list and then sort the object keys alphabetically. However, the sorting should be case-insensitive, and the original data structure should be preserved (e.g., arrays should remain arrays, objects should remain objects).

Next, remove any duplicate objects from arrays. Two objects are considered duplicates if they have the same keys and values in the same order. Only the first occurrence should be preserved when an array contains duplicate objects.

Finally, remove any object properties with all values set to an empty string, null, or undefined, and console log an array of the modified objects as a string.

## Problem Breadown
- For all objects/nested objects
  - keys should be sorted alphabetically and should be case-insensitive
  - an object entry with value === '', null, undefined, [], or {}, should be removed

- For all arrays/nested arrays
  - remove duplicate elements
    - Do deep comparison for objects
  - no sorting for array elements
    - no explicit instruction for sorting array elements similar to the object keys

- Console log the modified array of objects as string.

## NOTE
See the expected results in the `results` directory.

* `results/original-data.json` - original, unprocessed data from `GET https://coderbyte.com/api/challenges/json/wizard-list`.
* `results/processed-data.json` - processed data as per requirements.