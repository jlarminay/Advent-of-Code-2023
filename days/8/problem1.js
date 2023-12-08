import fs from 'fs';

// set timer
console.time('timer');

// read input file into array of strings
let allInputs = fs.readFileSync('input.txt', 'utf8');
allInputs = allInputs.split('\n');

// get all instructions
let instructions = allInputs[0].replace('\r', '').split('');
let steps = 0;
let start = 'AAA';
let end = 'ZZZ';
let current = start;

// get all nodes into object
let nodes = {};
for (let i = 2; i < allInputs.length; i++) {
  // skip if empty line
  if (allInputs[i] === '') continue;

  // get location and targets
  let [location, targets] = allInputs[i].split(' = ');

  // get right and left targets
  let [left, right] = targets.replace('(', '').replace(')', '').replace('\r', '').split(', ');

  // add to nodes
  nodes[location] = { left, right };
}

// do instructions until reach end
while (current != end) {
  // get current node
  let currentNode = nodes[current];
  // console.log('currentNode', currentNode);

  // do instruction
  if (instructions[steps % instructions.length] === 'R') {
    // console.log('R', currentNode.right);
    current = currentNode.right;
  } else {
    // console.log('L', currentNode.left);
    current = currentNode.left;
  }

  // increment steps
  steps++;
}

// print total steps
console.log(steps);

// log timer
console.timeEnd('timer');
