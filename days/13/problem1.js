import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.test.txt', 'utf8');
allInputs = allInputs.split('\n');

let totalSum = 0;

// turn inputs into 2d arrays of grid
let grid = [];
let puzzleId = 0;
for (let i = 0; i < allInputs.length; i++) {
  // row is empty
  if (allInputs[i] === '\r') {
    // increment puzzle id
    puzzleId++;
  }

  if (!grid[puzzleId]) {
    grid[puzzleId] = [];
  }
  grid[puzzleId].push(allInputs[i].replace('\r', '').split(''));
}

// for (let i = 0; i < 1; i++) {
//   console.log(grid[i].length);
//   for (let j = 0; j < grid[i].length; j++) {
//     console.log(grid[i][j].join(''));
//   }
// }

// go through each puzzle
// go through each row
// see if contains row reflection
// if yes, add to total sum
// if no, check if contains column reflection
// if yes, add to total sum * 100

// for each puzzle
for (let i = 0; i < 1; i++) {
  // for each row
  for (let j = 0; j < grid[i].length; j++) {
    let rowCurrent = grid[i][j].join('');
    let rowNext = grid[i][j + 1] ? grid[i][j + 1].join('') : null;
    console.log(j, rowCurrent, rowNext);
    if (rowCurrent === rowNext) {
      console.log('row reflection found');
      totalSum += j + 1;
    }
  }
}

console.log(totalSum);

// log timer
console.timeEnd('timer');
