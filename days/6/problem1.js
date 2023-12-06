import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let sumWinnings = 1;

const times = allInputs[0].split(':')[1].replace(/\s+/g, ' ').trim().split(' ');
const distances = allInputs[1].split(':')[1].replace(/\s+/g, ' ').trim().split(' ');

for (let i = 0; i < times.length; i++) {
  const raceTime = parseInt(times[i]);
  const raceRecord = parseInt(distances[i]);

  // set number of winning holdTimes
  let possibleWinningTimes = 0;

  let lastGameState = false;
  let holdTime = 0;
  while (holdTime < raceTime + 1) {
    // get hold time and speed
    let timeLeft = raceTime - holdTime;
    let currentSpeed = holdTime;

    // find distance
    let distance = timeLeft * currentSpeed;

    // check if distance beat record
    let beatRecord = distance > raceRecord;
    if (beatRecord) {
      possibleWinningTimes += 1;
    }

    // console.log(
    //   `holdTime: ${holdTime}, distance: ${distance}, beatRecord: ${beatRecord}, possibleWinningTimes: ${possibleWinningTimes}`,
    // );

    // check if lost now after winning
    if (!beatRecord && lastGameState) {
      // no way to win now so break out of loop
      break;
    }

    // set last game state
    lastGameState = beatRecord;

    // try next hold time
    holdTime += 1;
  }

  sumWinnings *= possibleWinningTimes;
}

// print answer
console.log(sumWinnings);

// log timer
console.timeEnd('timer');
