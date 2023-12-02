import shell from 'shelljs';

const args = process.argv.slice(2);

const day = args[0];
const problem = args[1];

if (!day || !problem) {
  console.log('Please provide day and problem number');
  process.exit(1);
}

shell.cd(`days/${day}`);
shell.exec(`node problem${problem}.js`);
