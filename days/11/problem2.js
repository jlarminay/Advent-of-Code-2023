import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let map = [];
let allGalaxies = [];
let allPairs = [];
let emptyRows = [];
let emptyColumns = [];

let totalDistances = 0;

// create 2d array of map
for (let i = 0; i < allInputs.length; i++) {
  map.push(allInputs[i].replace('\r', '').split(''));
}

// find empty rows and columns
{
  // check if any row is empty
  for (let i = 0; i < map.length; i++) {
    // if empty, add another row
    if (map[i].indexOf('#') < 0) {
      emptyRows.push(i);
    }
  }

  // check if any column is empty
  for (let i = 0; i < map.length; i++) {
    let column = [];
    // get whole column
    for (let j = 0; j < map.length; j++) {
      column.push(map[j][i]);
    }
    // check if column is empty
    if (column.indexOf('#') < 0) {
      emptyColumns.push(i);
    }
  }
}

// // print out expanded map
// for (let i = 0; i < map.length; i++) {
//   console.log(map[i].join(''));
// }

// find all galaxies
{
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '#') {
        allGalaxies.push({ x: j, y: i });
      }
    }
  }
}

// get all pairs
for (let i = 0; i < allGalaxies.length; i++) {
  for (let j = i + 1; j < allGalaxies.length; j++) {
    allPairs.push([allGalaxies[i], allGalaxies[j]]);
  }
}

// console.log(emptyRows);
// console.log(emptyColumns);

// for each pair, find distance
let expansionRate = 1000000;
for (let i = 0; i < allPairs.length; i++) {
  let pair = allPairs[i];

  let countEmptyRows = 0;
  let countEmptyCols = 0;

  // check if empty row is between pair
  for (let j = 0; j < emptyRows.length; j++) {
    // if yes
    if (
      (pair[0].y < emptyRows[j] && pair[1].y > emptyRows[j]) ||
      (pair[0].y > emptyRows[j] && pair[1].y < emptyRows[j])
    ) {
      countEmptyRows++;
    }
  }

  // check if pair crosses empty column
  for (let j = 0; j < emptyColumns.length; j++) {
    // if yes
    if (
      (pair[0].x < emptyColumns[j] && pair[1].x > emptyColumns[j]) ||
      (pair[0].x > emptyColumns[j] && pair[1].x < emptyColumns[j])
    ) {
      countEmptyCols++;
    }
  }

  let distanceRow =
    Math.abs(pair[0].y - pair[1].y) - countEmptyRows + countEmptyRows * expansionRate;
  let distanceCol =
    Math.abs(pair[0].x - pair[1].x) - countEmptyCols + countEmptyCols * expansionRate;

  // console.log();
  // console.log(pair, distanceRow, distanceCol, distanceRow + distanceCol);
  // console.log('passing', countEmptyRows, 'empty rows');
  // console.log('passing', countEmptyCols, 'empty columns');

  totalDistances += distanceRow + distanceCol;
}

console.log(totalDistances);

// log timer
console.timeEnd('timer');
