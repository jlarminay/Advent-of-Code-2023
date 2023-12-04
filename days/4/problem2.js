import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let sum = 0;
let finalArrayCount = [];

for (let i = 0; i < allInputs.length; i++) {
  // if input is empty, skip
  if (allInputs[i] === '') continue;

  // get numbers into arrays
  let currentInput = allInputs[i].split(': ')[1].replace('\r', '');
  let [winningNumbers, gotNumbers] = currentInput.split(' | ');

  winningNumbers = winningNumbers.split(' ');
  gotNumbers = gotNumbers.split(' ');

  let ticketScore = 0;

  // check each number in winningNumbers
  winningNumbers.forEach((winningNumber) => {
    // check if number is empty
    if (winningNumber === '') return;

    // check if number is in gotNumbers
    if (gotNumbers.includes(winningNumber)) {
      // if it is
      ticketScore += 1;
    }
  });

  // console.log(`ticket ${i} score: ${ticketScore}`);

  // add one count for current ticket
  if (finalArrayCount[i] === undefined) finalArrayCount[i] = 0;
  finalArrayCount[i] += 1;

  // get current count of tickets
  let currentCount = finalArrayCount[i];

  // add counts of won tickets to array
  for (let j = 0; j < ticketScore; j++) {
    // if array index is undefined, set to 0
    if (finalArrayCount[i + j + 1] === undefined) finalArrayCount[i + j + 1] = 0;
    // add one ticket count
    finalArrayCount[i + j + 1] += 1 * currentCount;
  }
}

// add all counts of won tickets
finalArrayCount.forEach((count) => {
  sum += count;
});

console.log(sum);
