import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let seeds = [];
let conversions = {
  'seed-to-soil': [],
  'soil-to-fertilizer': [],
  'fertilizer-to-water': [],
  'water-to-light': [],
  'light-to-temperature': [],
  'temperature-to-humidity': [],
  'humidity-to-location': [],
};

let activeCategory = '';
let lowestLocation = Infinity;

// go through each line and create arrays of objects
for (let i = 0; i < allInputs.length; i++) {
  let line = allInputs[i].replace('\r', '');

  // if line starts with 'seeds:'
  if (line.startsWith('seeds:')) {
    seeds = line.split(': ')[1].split(' ');
    continue;
  }

  // get line and check category
  if (line.includes('-to-')) {
    activeCategory = line.split(' ')[0];
    continue;
  }

  // ignore empty lines
  if (line === '') continue;

  // get line numbers
  let [destRangeStart, sourceRangeStart, rangeLength] = line.split(' ');
  conversions[activeCategory].push({
    sourceRangeStart: parseInt(sourceRangeStart),
    destRangeStart: parseInt(destRangeStart),
    rangeLength: parseInt(rangeLength),
  });
}

// go through all seeds and do math for each one
for (let i = 0; i < seeds.length; i++) {
  let seedNumber = parseInt(seeds[i]);

  let previousNumber = seedNumber;
  let newNumber = undefined;

  // find all numbers
  Object.keys(conversions).forEach((conversionTitle) => {
    // for each conversion, check if withing source range
    for (let k = 0; k < conversions[conversionTitle].length; k++) {
      let { sourceRangeStart, destRangeStart, rangeLength } = conversions[conversionTitle][k];

      // check if previous number is within range
      if (previousNumber >= sourceRangeStart && previousNumber < sourceRangeStart + rangeLength) {
        // get new number conversion
        newNumber = destRangeStart + (previousNumber - sourceRangeStart);
        break;
      }
    }

    // default to previous number if no number is found
    previousNumber = newNumber || previousNumber;
  });

  // check if new number is lower than lowest location
  if (newNumber < lowestLocation) {
    lowestLocation = newNumber;
  }
}

// print final answer
console.log(lowestLocation);

// log timer
console.timeEnd('timer');
