import fs from 'fs';

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

// set default sum
let sum = 0;

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

  // find power or cubes
  const power = currentGame.red * currentGame.green * currentGame.blue;

  // game is possible, add game id to sum
  sum += power;
}

console.log(sum);
