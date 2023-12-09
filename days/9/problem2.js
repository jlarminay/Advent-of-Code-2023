import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let finalSum = 0;

for (let k = 0; k < allInputs.length; k++) {
  // break if empty line
  if (allInputs[k] === '') break;

  // get next line
  let final = [];
  final[0] = allInputs[k]
    .replace('\r', '')
    .split(' ')
    .map((x) => parseInt(x));

  // loop until we get a 0 array
  let j = 0;
  while (j < final.length) {
    // get current array to find differences
    let current = final[j];
    let i = 0;
    const tmp = [];
    // loop through array and find differences
    while (i < current.length - 1) {
      // add difference to next array
      tmp.push(current[i + 1] - current[i]);
      i += 1;
    }

    // add new array to final array
    final.push(tmp);

    // if array is nothing but 0s, we're done
    if (tmp.every((val) => val === 0)) {
      break;
    }
    j++;
  }

  // find next number
  let nextNumber = final[0][0];
  for (let i = 1; i < final.length; i++) {
    // if even add value at index
    if (i % 2 === 0) nextNumber += final[i][0];
    // if odd subtract value at index
    else nextNumber -= final[i][0];
  }

  // add to final sum
  finalSum += nextNumber;
}

// log answer
console.log(finalSum);

// log timer
console.timeEnd('timer');
