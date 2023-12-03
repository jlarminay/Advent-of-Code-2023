import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let sum = 0;
const possibleSymbols = ['+', '-', '*', '/', '&', '@', '#', '$', '%', '='];
const symbolPositions = [];

// find all positions of symbols
for (let i = 0; i < allInputs.length; i++) {
  const currentRow = allInputs[i].split('');

  // find all symbols
  for (let j = 0; j < possibleSymbols.length; j++) {
    let k = -1;
    while ((k = currentRow.indexOf(possibleSymbols[j], k + 1)) !== -1) {
      symbolPositions.push([i, k]);
    }
  }
}

for (let i = 0; i < symbolPositions.length; i++) {
  // find if adjacent to number
  const checkPositions = [
    [symbolPositions[i][0] - 1, symbolPositions[i][1] - 1], // top left
    [symbolPositions[i][0] - 1, symbolPositions[i][1] - 0], // top
    [symbolPositions[i][0] - 1, symbolPositions[i][1] + 1], // top right
    [symbolPositions[i][0] - 0, symbolPositions[i][1] - 1], // left
    [symbolPositions[i][0] - 0, symbolPositions[i][1] + 1], // right
    [symbolPositions[i][0] + 1, symbolPositions[i][1] - 1], // bottom left
    [symbolPositions[i][0] + 1, symbolPositions[i][1] - 0], // bottom
    [symbolPositions[i][0] + 1, symbolPositions[i][1] + 1], // bottom right
  ];

  let lastValidPosition = null;

  // check positions
  for (let j = 0; j < checkPositions.length; j++) {
    const currentCheckPosition = checkPositions[j];
    const currentCheckPositionValue = allInputs[currentCheckPosition[0]][currentCheckPosition[1]];

    // check if next number is a continuation of previous number
    if (
      lastValidPosition !== null && // last position is set
      currentCheckPosition[0] === lastValidPosition[0] && //  same row
      currentCheckPosition[1] - lastValidPosition[1] === 1 && // within 1 column
      !isNaN(allInputs[currentCheckPosition[0]][currentCheckPosition[1]]) // is number
    ) {
      // number is the same so skip
      // console.log('skipping');
      lastValidPosition = currentCheckPosition;
      continue;
    }

    // check if number
    if (!isNaN(currentCheckPositionValue)) {
      lastValidPosition = currentCheckPosition;
      let finalNumber = [];

      // go forward until not number
      let k = 1;
      while (!isNaN(allInputs[currentCheckPosition[0]][currentCheckPosition[1] + k])) {
        finalNumber.push(allInputs[currentCheckPosition[0]][currentCheckPosition[1] + k]);
        k++;
      }

      // go back until not number
      k = 0;
      while (!isNaN(allInputs[currentCheckPosition[0]][currentCheckPosition[1] - k])) {
        finalNumber.unshift(allInputs[currentCheckPosition[0]][currentCheckPosition[1] - k]);
        k++;
      }

      // concat string
      finalNumber = finalNumber.join('');
      // console.log(finalNumber);

      // add number to sum
      sum += parseInt(finalNumber);
    }
  }
}

console.log(sum);
