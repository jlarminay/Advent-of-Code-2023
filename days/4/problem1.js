import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let sum = 0;

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
      // if it is, check if sum is 0
      if (ticketScore === 0) {
        // if it is, add 1
        ticketScore = 1;
      } else {
        // if it isn't, double it
        ticketScore = ticketScore * 2;
      }
    }
  });

  // add ticket score to sum
  sum += ticketScore;
}

console.log(sum);
