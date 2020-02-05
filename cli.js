#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
var fs = require('fs');
var path = require('path');
const html_templates = require('./templates/html')

// const [,, ...args] = process.argv

// console.log('Args:' + args)

let destination = null;

program
  .version('0.0.1')
  .arguments('<dest>')
  // .option('dest', 'Destination')
  .action(function (dest) {
    destination = dest
  })
  .option('-j, --jquery', 'Add Jquery')
  .option('-b, --bootstrap', 'Add bootstrap');
//   .option('-b, --bootstrap <version>', 'Add bootstrap(optional version)');

program.parse(process.argv);


// if (program.debug) console.log(program.opts());
if (program.jquery) console.log('- Jquery added');
if (program.bootsrap) console.log('- Bootstrap added');

if (destination) {
  console.log('Destination is: ' + destination)
  const currentDirectory = path.resolve(process.cwd())
  const projectDirectory = currentDirectory + '/' + destination

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
    console.log(projectDirectory)

    fs.writeFile(destination + '/index.html', html_templates.html_head, function (err) {
      if (err) throw err;
      console.log('Generated html file');
    });

  } else {
    console.log('Directory already exists')
  }


} else {
  console.log(`
${chalk.bold.bgRed('Missing destination folder')}
${chalk.redBright('Please run \'quick-draft <folder>\' to create a project')}
  `);
}