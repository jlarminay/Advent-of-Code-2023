import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

const startingPosition = [0, 0];
const possiblePipes = {
  '|': ['up', 'down'],
  '-': ['left', 'right'],
  L: ['right', 'up'],
  J: ['left', 'up'],
  7: ['left', 'down'],
  F: ['right', 'down'],
};

// convert input into 2d map
let map = [];
for (let i = 0; i < allInputs.length; i++) {
  const row = allInputs[i].replace('\r', '').split('');

  // does row contains starting position
  if (row.includes('S')) {
    startingPosition[0] = i;
    startingPosition[1] = row.indexOf('S');
  }

  map.push(row);
}

let previousDirection = null;
let currentPosition = null;
// get next position
{
  if (['|', '7', 'F', 'S'].includes(map[startingPosition[0] - 1][startingPosition[1]])) {
    currentPosition = [startingPosition[0] - 1, startingPosition[1]];
    previousDirection = 'down';
    // console.log('1: go up');
  }

  // check right
  else if (['-', 'J', '7', 'S'].includes(map[startingPosition[0]][startingPosition[1] + 1])) {
    currentPosition = [startingPosition[0], startingPosition[1] + 1];
    previousDirection = 'left';
    // console.log('1: go right');
  }

  // check down
  else if (['|', 'J', 'L', 'S'].includes(map[startingPosition[0] + 1][startingPosition[1]])) {
    currentPosition = [startingPosition[0] + 1, startingPosition[1]];
    previousDirection = 'up';
    // console.log('1: go down');
  }

  // check left
  else if (['-', 'F', 'L', 'S'].includes(map[startingPosition[0]][startingPosition[1] - 1])) {
    currentPosition = [startingPosition[0], startingPosition[1] - 1];
    previousDirection = 'right';
    // console.log('1: go left');
  }
}

// console.log(previousDirection);
// console.log(currentPosition);
// console.log(map);
// console.log();

// get next position
let i = 0;
while (true) {
  // get current location symbol
  const symbol = map[currentPosition[0]][currentPosition[1]];

  // get next location from symbol
  const possibleDirections = possiblePipes[symbol];

  let nextDirection = null;

  // check if next direction was previous
  if (possibleDirections[0] === previousDirection) {
    // use second direction
    nextDirection = possibleDirections[1];
  } else {
    // use first direction
    nextDirection = possibleDirections[0];
  }

  // apply next direction
  switch (nextDirection) {
    case 'up':
      // console.log(i + 1, ': go up');
      currentPosition[0] -= 1;
      previousDirection = 'down';
      break;
    case 'right':
      // console.log(i + 1, ': go right');
      currentPosition[1] += 1;
      previousDirection = 'left';
      break;
    case 'down':
      // console.log(i + 1, ': go down');
      currentPosition[0] += 1;
      previousDirection = 'up';
      break;
    case 'left':
      // console.log(i + 1, ': go left');
      currentPosition[1] -= 1;
      previousDirection = 'right';
      break;
  }

  // increment steps
  i++;

  // check if next position is starting position
  if (map[currentPosition[0]][currentPosition[1]] === 'S') {
    // console.log('found starting position');
    break;
  }
}

// add one extra step for initial position
i++;

console.log('total length', i);
console.log('answer', i / 2);

// log timer
console.timeEnd('timer');
