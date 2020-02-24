#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const templates = require('./templates/base')
const { exec } = require("child_process");

// const [,, ...args] = process.argv

// console.log('Args:' + args)

let destination = null;
let isNpmProject = false;

program
  .version('1.0.3')
  .arguments('<dest>')
  .action(function (dest) {
    destination = dest
  })
  .option('--jquery', 'Add Jquery')
  .option('--bootstrap', 'Add bootstrap')
  .option('--threejs', 'Add threejs')
  .option('--algo', 'Install jest, create a .js and a .test.js file')

program.parse(process.argv);

if (program.algo) {
   isNpmProject = true;
}

if (destination) {  
  initStructure()

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
    initStructure()
  });
}

function initStructure() {
  if (isNpmProject) {
    generateProject()
  } else {
    generateFiles()
  }
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

async function generateProject() {
  const currentDirectory = path.resolve(process.cwd())
  const projectDirectory = currentDirectory + '/' + destination

  console.log('Initializing project...')

  await execute('npm init --y')
    .then(res => console.log(res))
    .catch(err => console.warn(err))

  console.log('Installing jest...')

  await execute('npm install jest --save-dev')
    .then(res => console.log(res))
    .catch(err => console.warn(err))

}

function execute(cmd) {
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
     reject(stderr)
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }