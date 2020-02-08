const versions = require('../scripts/versions')

module.exports.getFiles = function (name, bootstrap, jquery, threejs) {

  return {
    html: getHtml(name, bootstrap, jquery, threejs),
    js: getJS(),
    css: getCss()
  }
}

function getHtml(name, bootstrap, jquery, threejs) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  ${bootstrap ? versions.bootstrap.styles.map(el => `${el}\n`): ''}
  <link rel="stylesheet" type="text/css" href="${name}.css">
  <title>${name}</title>
</head>
<body>
${(jquery && !bootstrap) ? versions.jquery.scripts.join('\n'): ''}
${bootstrap ? versions.bootstrap.scripts.join('\n'): ''}
${threejs ? versions.threejs.scripts.join('\n'): ''}
<script src="${name}.js"></script>
</body>
</html>
`
}

function getJS() {
  return `

  `
}

function getCss() {
  return `html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
  `
}