import fs from 'fs';

// ---------- ---------- ----------
// functions start
function getHandType(hand) {
  const cards = {};
  hand.split('').forEach((card) => {
    if (cards[card]) {
      cards[card]++;
    } else {
      cards[card] = 1;
    }
  });

  // check if five of a kind
  if (Object.values(cards).includes(5)) {
    return 6;
  }

  // check if four of a kind
  if (Object.values(cards).includes(4)) {
    return 5;
  }

  // check if full house
  if (Object.values(cards).includes(3) && Object.values(cards).includes(2)) {
    return 4;
  }

  // check if three of a kind
  if (Object.values(cards).includes(3)) {
    return 3;
  }

  // check if two pair
  if (Object.values(cards).includes(2) && Object.keys(cards).length === 3) {
    return 2;
  }

  // check if one pair
  if (Object.values(cards).includes(2)) {
    return 1;
  }

  // check if high card
  return 0;
}

function compareHands(hand1, hand2) {
  // check each position of hands until one is better
  const hand1Cards = hand1.split('');
  const hand2Cards = hand2.split('');

  const possibleCards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  for (let i = 0; i < hand1Cards.length; i++) {
    // hands are the same
    if (hand1Cards[i] === hand2Cards[i]) {
      continue;
    }

    // hand 1 is better
    if (possibleCards.indexOf(hand1Cards[i]) > possibleCards.indexOf(hand2Cards[i])) {
      return 1;
    }

    // hand 2 is better
    if (possibleCards.indexOf(hand1Cards[i]) < possibleCards.indexOf(hand2Cards[i])) {
      return 2;
    }
  }
  return 1;
}
// functions end
// ---------- ---------- ----------

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

let totalWinnings = 0;
let allHands = [];

// go through each line and put in array
for (let i = 0; i < allInputs.length; i++) {
  // break if empty line
  if (allInputs[i] === '') break;

  let hand = allInputs[i].replace('\r', '').split(' ');
  allHands.push({
    hand: hand[0],
    handScore: getHandType(hand[0]),
    bid: hand[1],
  });
}

// sort hands by score
allHands.sort((a, b) => {
  // check if score is the same
  if (a.handScore === b.handScore) {
    const compare = compareHands(a.hand, b.hand);
    if (compare === 1) {
      return 1;
    }
    if (compare === 2) {
      return -1;
    }
  }

  // hand 1 is better
  if (a.handScore > b.handScore) {
    return 1;
  }

  // hand 2 is better
  if (a.handScore < b.handScore) {
    return -1;
  }
  return 0;
});

// determine winnings of hands
for (let i = 0; i < allHands.length; i++) {
  totalWinnings += allHands[i].bid * (i + 1);
}

// console.log(allHands);

// print answer
console.log(totalWinnings);

// log timer
console.timeEnd('timer');
