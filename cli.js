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
  .version('1.0.1')
  .arguments('<dest>')
  .action(function (dest) {
    destination = dest
  })
  .option('--jquery', 'Add Jquery')
  .option('--bootstrap', 'Add bootstrap')
  .option('--threejs', 'Add threejs')

program.parse(process.argv);

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

    const args = [destination, program.bootstrap, program.jquery, program.threejs]

    fs.mkdirSync(projectDirectory);

    fs.writeFile(destination + '/index.html', templates.getFiles(...args).html, function (err) {
      if (err) throw err;
    });

    fs.writeFile(destination + `/${destination}.js`, templates.getFiles(...args).js, function (err) {
      if (err) throw err;
    });

    fs.writeFile(destination + `/${destination}.css`, templates.getFiles(...args).css, function (err) {
      if (err) throw err;
    });

    console.log(chalk.green('Project created successfully!'))

  } else {
    console.log(chalk.redBright('Directory already exists'))
  }
}