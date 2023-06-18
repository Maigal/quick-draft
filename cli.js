#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const baseTemplates = require('./templates/base')
const algoTemplates = require('./templates/algo')
const { exec } = require("child_process");

let destination = null;
let isNpmProject = false;

function printUpdate(str){
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(str);
}
function printStop(){
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
}

program
  .version('1.0.3')
  .arguments('<dest>')
  .action(function (dest) {
    destination = dest
  })
  .option('--jquery', 'Add Jquery')
  .option('--bootstrap', 'Add bootstrap')
  .option('--threejs', 'Add threejs')
  .option('--test', 'Install jest, create a .js and a .test.js file')

program.parse(process.argv);

if (program.test) {
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

    fs.writeFile(destination + '/index.html', baseTemplates.getFiles(...args).html, function (err) {
      if (err) throw err;
    });

    fs.writeFile(destination + `/${destination}.js`, baseTemplates.getFiles(...args).js, function (err) {
      if (err) throw err;
    });

    fs.writeFile(destination + `/${destination}.css`, baseTemplates.getFiles(...args).css, function (err) {
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

  if (!fs.existsSync(projectDirectory)) {

    fs.mkdirSync(projectDirectory);

    process.chdir(destination);

    printUpdate('Initializing project...')

    await execute('npm init --y')
      .catch(err => console.warn(err))

    printUpdate('Installing jest...')

    await execute('npm install jest --save-dev')
      .catch(err => console.warn(err))

    try {
      printUpdate('Creating files...')
      const _scripts = {
        "test": "jest",
        "test-watch": "jest --watchAll"
      }
      const fileData = fs.readFileSync("./package.json", "utf8")
      const jsonData = JSON.parse(fileData)
      jsonData["scripts"] = _scripts
      fs.writeFileSync("./package.json", JSON.stringify(jsonData), null, 2)
      fs.writeFile(`index.js`, algoTemplates.getFiles().js, function (err) {
        if (err) throw err;
      });
      fs.writeFile(`index.test.js`, algoTemplates.getFiles().testJs, function (err) {
        if (err) throw err;
      });
      
    }
    catch (err) {
      console.warn(err)
    }

    printStop()
    console.log(chalk.green('Project created successfully!'))
    console.log(`To run and watch your test, run ${chalk.yellow(`cd ${destination} && npm run test-watch`)}`)
    
  } else {
    console.log(chalk.redBright('Directory already exists'))
  }
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