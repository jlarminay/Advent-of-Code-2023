import fs from 'fs';

// ---------- ---------- ----------
// functions start
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
// functions end
// ---------- ---------- ----------

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

// get all instructions
let instructions = allInputs[0].replace('\r', '').split('');
let steps = 0;

let allLocationsAtEnd = false;
let currentLocations = [];

// get all nodes into object
let nodes = {};
for (let i = 2; i < allInputs.length; i++) {
  // skip if empty line
  if (allInputs[i] === '') continue;

  // get location and targets
  let [location, targets] = allInputs[i].split(' = ');

  // check if location ends with 'A'
  if (location.endsWith('A')) currentLocations.push(location);

  // get right and left targets
  let [left, right] = targets.replace('(', '').replace(')', '').replace('\r', '').split(', ');

  // add to nodes
  nodes[location] = { left, right };
}

let lengths = Array(currentLocations.length).fill(0);

// find length for each starting position
for (let i = 0; i < currentLocations.length; i++) {
  let current = currentLocations[i];

  // do instructions until reach end
  while (!current.endsWith('Z')) {
    // get current node
    let currentNode = nodes[current];

    // do instruction
    if (instructions[lengths[i] % instructions.length] === 'R') {
      // console.log('R', currentNode.right);
      current = currentNode.right;
    } else {
      // console.log('L', currentNode.left);
      current = currentNode.left;
    }

    // increment length
    lengths[i]++;
  }
}

// find lcm of first 2 elements
let results = lcm(lengths[0], lengths[1]);
// find lcm of all elements
for (let i = 2; i < lengths.length; i++) {
  results = lcm(results, lengths[i]);
}

console.log(lengths);
console.log(results);

// log timer
console.timeEnd('timer');
