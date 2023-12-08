import fs from 'fs';

// ---------- ---------- ----------
// functions start

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
console.log('currentLocations', currentLocations);

// find length for each starting position
for (let i = 0; i < currentLocations.length; i++) {
  let current = currentLocations[i];

  // do instructions until reach end
  while (!current.endsWith('Z')) {
    // get current node
    let currentNode = nodes[current];

    // do instruction
    if (instructions[steps % instructions.length] === 'R') {
      // console.log('R', currentNode.right);
      current = currentNode.right;
    } else {
      // console.log('L', currentNode.left);
      current = currentNode.left;
    }

    // increment length
    lengths[i]++;
    if (lengths[i] % 100000000 === 0) console.log('lengths', lengths[i]);
  }

  console.log('length', lengths);
}

// // do instructions until reach end
// while (allLocationsAtEnd === false) {
//   // get next instruction
//   let nextInstruction = instructions[steps % instructions.length];

//   // console.log();

//   // apply instruction to each current location
//   for (let i = 0; i < currentLocations.length; i++) {
//     // get current node
//     let currentNode = nodes[currentLocations[i]];
//     // console.log('currentNode', currentNode);

//     // apply instruction to node
//     if (nextInstruction === 'R') {
//       // console.log('R', currentNode.right);
//       currentLocations[i] = currentNode.right;
//     } else {
//       // console.log('L', currentNode.left);
//       currentLocations[i] = currentNode.left;
//     }
//   }

//   // check if all locations are at end
//   let currentEndings = 0;
//   for (let i = 0; i < currentLocations.length; i++) {
//     if (currentLocations[i].endsWith('Z')) {
//       currentEndings++;
//     }
//   }

//   // end if all locations are at end
//   allLocationsAtEnd = false;
//   if (currentEndings === currentLocations.length) {
//     console.log(currentLocations);
//     allLocationsAtEnd = true;
//   }

//   // increment steps
//   steps++;
//   // console.log(currentLocations);
//   if (steps % 10000000 === 0) console.log('steps', steps);
//   // console.log('steps', steps);
// }

// print total steps
console.log(steps);

// log timer
console.timeEnd('timer');
