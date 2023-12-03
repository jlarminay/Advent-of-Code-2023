import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

// set default sum
let sum = 0;
let maxGame = {
  red: 12,
  green: 13,
  blue: 14,
};

// go through each input
for (let i = 0; i < allInputs.length; i++) {
  // skip if length is 0
  if (allInputs[i] === '') continue;

  // split input
  let [gameId, gameValues] = allInputs[i].split(': ');
  const currentGame = {
    red: 0,
    green: 0,
    blue: 0,
  };

  // get game id
  gameId = gameId.split(' ')[1];

  // get game values
  gameValues = gameValues.split('; ');

  // go through each game and find each pull
  for (let j = 0; j < gameValues.length; j++) {
    const values = gameValues[j].split(', ');

    // get pull number
    for (let k = 0; k < values.length; k++) {
      const [count, color] = values[k].replace('\r', '').split(' ');

      // add to current game
      currentGame[color] =
        parseInt(count) > currentGame[color] ? parseInt(count) : currentGame[color];
    }
  }

  // check if current game is possible
  if (
    currentGame.red > maxGame.red ||
    currentGame.green > maxGame.green ||
    currentGame.blue > maxGame.blue
  ) {
    // game is not possible
    continue;
  }

  // game is possible, add game id to sum
  sum += parseInt(gameId);
}

console.log(sum);
