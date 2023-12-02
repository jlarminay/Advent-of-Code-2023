import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

// set default sum
let sum = 0;
let possibleNumbers = [
  { needle: '1', value: 1 },
  { needle: '2', value: 2 },
  { needle: '3', value: 3 },
  { needle: '4', value: 4 },
  { needle: '5', value: 5 },
  { needle: '6', value: 6 },
  { needle: '7', value: 7 },
  { needle: '8', value: 8 },
  { needle: '9', value: 9 },
  { needle: 'one', value: 1 },
  { needle: 'two', value: 2 },
  { needle: 'three', value: 3 },
  { needle: 'four', value: 4 },
  { needle: 'five', value: 5 },
  { needle: 'six', value: 6 },
  { needle: 'seven', value: 7 },
  { needle: 'eight', value: 8 },
  { needle: 'nine', value: 9 },
];

// go through each input
for (let i = 0; i < allInputs.length; i++) {
  // get single input
  const singleInput = allInputs[i].toLowerCase();
  let allPositions = [];

  // skip if input is empty
  if (singleInput === '') continue;

  // find position of all numbers
  possibleNumbers.forEach((number) => {
    let j = -1;
    while ((j = singleInput.indexOf(number.needle, j + 1)) !== -1) {
      allPositions.push({ position: j, value: number.value });
    }
  });

  // sort positions
  allPositions.sort((a, b) => {
    return a.position - b.position;
  });

  // get first number
  const firstNumber = allPositions[0].value;

  // get last number
  const lastNumber = allPositions[allPositions.length - 1].value;

  // concat numbers
  const finalNumber = parseInt(`${firstNumber}${lastNumber}`);

  // // add to sum
  sum += finalNumber;

  // console.log(`${firstNumber} + ${lastNumber} = ${finalNumber} => ${sum}`);
}

// print sum
console.log(sum);
