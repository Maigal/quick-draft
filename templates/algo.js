module.exports.getFiles = function () {

  return {
    js: getJS(),
    testJs: getTestJs()
  }
}

function getJS() {
  return `function doSomething(arg) {
    return arg + ' test'
  }
  
  module.exports = doSomething
  `
}

function getTestJs() {
  return `const doSomething = require('./index')

  test('default test', () => {
    
    expect(doSomething('example')).toBe('example test');
  });
  `
}