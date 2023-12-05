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

async function getConversionRates() {
  // go through each line and create arrays of objects
  for (let i = 0; i < allInputs.length; i++) {
    let line = allInputs[i].replace('\r', '');

    // if line starts with 'seeds:'
    if (line.startsWith('seeds:')) {
      let tempSeeds = line.split(': ')[1].split(' ');
      // do math to find seed range
      for (let j = 0; j < tempSeeds.length; j = j + 2) {
        seeds.push([parseInt(tempSeeds[j]), parseInt(tempSeeds[j + 1])]);
      }
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
}

async function getSeedFromLocation(location) {
  let previousNumber = location;
  let newNumber = undefined;

  // find all numbers
  Object.keys(conversions)
    .reverse()
    .forEach((conversionTitle) => {
      // for each conversion, check if withing dest range
      for (let k = 0; k < conversions[conversionTitle].length; k++) {
        let { sourceRangeStart, destRangeStart, rangeLength } = conversions[conversionTitle][k];

        // check if previous number is within range
        if (previousNumber >= destRangeStart && previousNumber < destRangeStart + rangeLength) {
          // get new number conversion
          newNumber = sourceRangeStart + (previousNumber - destRangeStart);
          break;
        }
      }

      // default to previous number if no number is found
      previousNumber = newNumber || previousNumber;
    });

  return newNumber;
}

async function getMaxPossibleLocation() {
  let maxPossibleLocation = 0;

  conversions['humidity-to-location'].forEach((conversion) => {
    let { sourceRangeStart, destRangeStart, rangeLength } = conversion;
    let maxPossible = destRangeStart + rangeLength - 1;

    if (maxPossible > maxPossibleLocation) {
      maxPossibleLocation = maxPossible;
    }
  });

  return maxPossibleLocation;
}

// get conversion rates
await getConversionRates();

let minLocation = 0;
let maxLocation = await getMaxPossibleLocation();

const searchAdditions = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];

let currentSeed = undefined;

// for each searching number
for (let i = 0; i < searchAdditions.length; i++) {
  // ensure location never goes over max possible
  while (minLocation < maxLocation) {
    // get seed from location
    currentSeed = await getSeedFromLocation(minLocation);
    console.log('location', minLocation, 'seed', currentSeed);

    // does seed exist in seeds
    let seedExists = false;
    for (let i = 0; i < seeds.length; i++) {
      // get min and max seeds in given range
      let minSeed = seeds[i][0];
      let maxSeed = seeds[i][0] + seeds[i][1];

      // check if seed is within range
      if (currentSeed >= minSeed && currentSeed < maxSeed) {
        seedExists = true;
        break;
      }
    }

    // if seed exists
    if (seedExists) {
      // remove search addition, so it can start before the number was found
      minLocation = minLocation - searchAdditions[i];
      // break out of loop
      break;
    }

    // add search addition
    minLocation = minLocation + searchAdditions[i];
  }

  // print out valid number was found
  console.log('found valid seed =>', minLocation);
  console.log();
}

// final number was found (add 1 to get the correct number)
minLocation = minLocation + 1;

console.log();
console.log('final location', minLocation);
console.log('lowest seed', currentSeed);

// correct value = 57451709

// log timer
console.timeEnd('timer');
