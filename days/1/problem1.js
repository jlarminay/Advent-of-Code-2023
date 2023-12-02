import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

// set default sum
let sum = 0;

// go through each input
for (let i = 0; i < allInputs.length; i++) {
  // break input into array of characters
  const singleInput = allInputs[i].split('');

  // skip if length is 0
  if (singleInput.length === 0) continue;

  // find first number
  const firstNumber = singleInput.find((value) => {
    if (Number(value)) {
      return true;
    }
    return false;
  });

  // find last number
  const lastNumber = singleInput.toReversed().find((value) => {
    if (Number(value)) {
      return true;
    }
    return false;
  });

  // concat numbers
  const finalNumber = parseInt(`${firstNumber}${lastNumber}`);

  // add to sum
  sum += finalNumber;
}

// print sum
console.log(sum);
