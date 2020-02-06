const versions = require('../scripts/versions')

module.exports.getFiles = function (name, bootstrap, jquery) {

  return {
    html: getHtml(name, bootstrap, jquery),
    js: getJS(),
    css: getCss()
  }
}

function getHtml(name, bootstrap, jquery) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <link rel="stylesheet" type="text/css" href="${name}.css">
  <title>${name}</title>
</head>
<body>
${jquery || bootstrap ? `<script src="${versions.jquery.scripts[0]}"></script>\n` : ''}
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