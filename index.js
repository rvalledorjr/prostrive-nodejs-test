const https = require('https');

/**
 * These implementation is based on the following understanding of the requirements.
 * 
 * For all objects/nested objects
 *  - keys should be sorted alphabetically and should be case-insensitive
 *  - an object entry with value === '', null, undefined, [], or {}, should be removed
 * 
 * For all arrays/nested arrays
 *  - remove duplicate elements
 *    - Do deep comparison for objects
 *  - no sorting for array elements
 *    - no explicit instruction for sorting array elements similar to the object keys
*/

https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
  const receivedData = [];
  resp.on('data', (chunk) => {
    receivedData.push(chunk);
  });

  resp.on('end', () => {
    const parsedData = JSON.parse(receivedData.join(''));

    const processedData = processData(parsedData);
    // console.log(JSON.stringify(processedData));
    console.log(receivedData.join(''));
  });

});

function processData(source) {
  let processedNode = new ParentNode(
    Array.isArray(source)? []: {}
  );

  for (const keyOrIndex in source) {
    const value = source[keyOrIndex];

    if (isEmptyValue(value)) {
      continue;
    }

    if (isObjectOrArray(value)) {
      const result = processData(value);
      if (!isEmptyObjectOrArray(result)) {
        processedNode.insert(keyOrIndex, result);
      }
      continue;
    }

    processedNode.insert(keyOrIndex, value);
  }  

  return processedNode.value;
  
}


class ParentNode {
  node;
  constructor(node) {
    this.node = node;
  }

  insert(keyOrIndex, node) {
    if (Array.isArray(this.node)) {
      this.node.push(node);
      return;
    }

    this.node[keyOrIndex] = node;
  }

  get value() {
    if (Array.isArray(this.node)) {
      const stringifiedNodes = this.node.map(subNode => JSON.stringify(subNode));
      return [...new Set(stringifiedNodes).values()]
        // .sort(compareString) //commented as understood above.
        .map(subNode => JSON.parse(subNode));
    }

    return Object.keys(this.node)
      .sort(compareString)
      .reduce((objResult, key) => {
        objResult[key] = this.node[key];
        return objResult;
      }, {});
  }
}

function compareString(str1, str2) {
  const str1LowCase = str1.toLowerCase();
  const str2LowCase = str2.toLowerCase();

  return str1LowCase.localeCompare(str2LowCase)
}

function isObjectOrArray(value) {
  return typeof value === 'object' || Array.isArray(value);
}

function isEmptyObjectOrArray(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return Object.keys(value).length === 0;
}

function isEmptyValue(value) {
  return value === null ||
    value === undefined ||
    value === '';
}