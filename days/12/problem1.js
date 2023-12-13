import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let totalPermutationSum = 0;

// go through each row
// find how many ?
// find how many possible permutations
// go though each permutation and find it matches
// if matches, add to count

for (let i = 0; i < allInputs.length; i++) {
  // skip if input empty
  if (allInputs[i] === '') continue;

  // split into springs and counts
  let [springs, counts] = allInputs[i].split(' ');

  // console.log(springs, counts);

  // find ? count
  let questionCount = springs.split('').filter((s) => s === '?').length;

  // find possible permutations
  let permutations = 2 ** questionCount;

  for (let j = 0; j < permutations; j++) {
    // replace ? with # or . based on binary position
    let binary = j.toString(2).padStart(questionCount, '0');
    let binaryIndex = 0;
    let newSprings = springs.replace(/\?/g, () => {
      let char = binary[binaryIndex];
      binaryIndex++;
      return char === '0' ? '.' : '#';
    });

    // check all series of # to find lengths
    let lengths = [];
    let currentPosition = 0;
    while (currentPosition < newSprings.length) {
      // get next pound
      let nextPound = newSprings.indexOf('#', currentPosition);
      // if no more pounds, break
      if (nextPound === -1) break;
      // get next dot
      let nextDot = newSprings.indexOf('.', nextPound);
      // if no more dots, set to end
      if (nextDot === -1) nextDot = newSprings.length;
      // add to lengths
      lengths.push(nextDot - nextPound);
      // set current position to next dot
      currentPosition = nextDot;
    }

    lengths = lengths.join(',');
    let lengthMatches = lengths.toString().trim() == counts.toString().trim();

    // check if permutation matches counts
    if (lengthMatches) {
      totalPermutationSum++;
    }

    // console.log(j, 'spring', newSprings, 'length', lengths);
  }

  // console.log(questionCount, permutations);
}

console.log(totalPermutationSum);

// log timer
console.timeEnd('timer');
