import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let expandedMap = [];
let map = [];
let allGalaxies = [];
let allPairs = [];

let totalDistances = 0;

// create 2d array of map
for (let i = 0; i < allInputs.length; i++) {
  map.push(allInputs[i].replace('\r', '').split(''));
}

// expand map
{
  // check if any row is empty
  for (let i = 0; i < map.length; i++) {
    expandedMap.push([...map[i]]);
    if (map[i].indexOf('#') < 0) {
      expandedMap.push([...map[i]]);
    }
  }

  // check if any column is empty
  let extraColumns = 0;
  for (let i = 0; i < map.length; i++) {
    let column = [];
    // get whole column
    for (let j = 0; j < map.length; j++) {
      column.push(map[j][i]);
    }
    // check if column is empty
    if (column.indexOf('#') < 0) {
      for (let k = 0; k < expandedMap.length; k++) {
        expandedMap[k].splice(i + extraColumns, 0, '.');
      }
      extraColumns++;
      i++;
    }
  }
}

// find all galaxies
{
  for (let i = 0; i < expandedMap.length; i++) {
    for (let j = 0; j < expandedMap[i].length; j++) {
      if (expandedMap[i][j] === '#') {
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

// for each pair, find distance
for (let i = 0; i < allPairs.length; i++) {
  let pair = allPairs[i];
  let distanceX = Math.abs(pair[0].x - pair[1].x);
  let distanceY = Math.abs(pair[0].y - pair[1].y);
  totalDistances += distanceX + distanceY;
}

console.log(totalDistances);

// log timer
console.timeEnd('timer');
