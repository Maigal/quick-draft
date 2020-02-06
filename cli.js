#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const templates = require('./templates/base')

// const [,, ...args] = process.argv

// console.log('Args:' + args)

let destination = null;

program
  .version('1.0.0')
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
// if (program.jquery) console.log('- Jquery added');
// if (program.bootsrap) console.log('- Bootstrap added');

if (destination) {
  
  generateFiles()

} else {
  inquirer
  .prompt([
    {
      name: 'projectName',
      message: 'What\'s the name of the project?',
    },
  ])
  .then(answers => {
    destination = answers.projectName;
    generateFiles()
  });
}

function generateFiles() {
  const currentDirectory = path.resolve(process.cwd())
  const projectDirectory = currentDirectory + '/' + destination

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
    console.log(projectDirectory)

    fs.writeFile(destination + '/index.html', templates.getFiles().html, function (err) {
      if (err) throw err;
    });

    fs.writeFile(destination + `/${destination}.js`, templates.getFiles().js, function (err) {
      if (err) throw err;
    });

    fs.writeFile(destination + `/${destination}.css`, templates.getFiles().css, function (err) {
      if (err) throw err;
    });

    console.log(chalk.green('Project created successfully!'))

  } else {
    console.log('Directory already exists')
  }
}