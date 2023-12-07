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

  const cardsMinJokers = JSON.parse(JSON.stringify(cards));
  delete cardsMinJokers.J;
  const cardValuesMinJoker = Object.values(cardsMinJokers);

  switch (true) {
    // check if 5 of a kind
    case cardValuesMinJoker.includes(5):
    case cardValuesMinJoker.includes(4) && cards.J === 1:
    case cardValuesMinJoker.includes(3) && cards.J === 2:
    case cardValuesMinJoker.includes(2) && cards.J === 3:
    case cardValuesMinJoker.includes(1) && cards.J === 4:
    case cards.J === 5:
      return 6;

    // check if 4 of a  kind
    case cardValuesMinJoker.includes(4):
    case cardValuesMinJoker.includes(3) && cards.J === 1:
    case cardValuesMinJoker.includes(2) && cards.J === 2:
    case cardValuesMinJoker.includes(1) && cards.J === 3:
    case cards.J === 4:
      return 5;

    // check if full house (3 of a kind and a pair)
    case cardValuesMinJoker.includes(3) && cardValuesMinJoker.includes(2): // 3 of a kind and a pair
    case cardValuesMinJoker.includes(3) && cardValuesMinJoker.includes(1) && cards.J === 1: // 3 of a kind and a pair and joker
    case cardValuesMinJoker.includes(3) && cards.J === 2: // 3 of a kind and 2 jokers
    case cardValuesMinJoker.filter((x) => x === 2).length === 2 && cards.J === 1: // 2 pair and joker
    case cardValuesMinJoker.includes(2) && cards.J === 2: // 1 pair and 2 jokers
    case cards.J === 3: // 3 jokers
      return 4;

    // check if 3 of a kind
    case cardValuesMinJoker.includes(3):
    case cardValuesMinJoker.includes(2) && cards.J === 1:
    case cardValuesMinJoker.includes(1) && cards.J === 2:
    case cards.J === 3:
      return 3;

    // check if 2 pair
    case cardValuesMinJoker.filter((x) => x === 2).length === 2:
    case cardValuesMinJoker.includes(2) && cards.J === 1:
    case cards.J === 2:
      return 2;

    // check if 1 pair
    case cardValuesMinJoker.includes(2):
    case cards.J === 1:
      return 1;

    default:
      return 0;
  }
}

function compareHands(hand1, hand2) {
  // check each position of hands until one is better
  const hand1Cards = hand1.split('');
  const hand2Cards = hand2.split('');

  const possibleCards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

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
