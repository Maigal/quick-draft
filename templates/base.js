const versions = require('../scripts/versions')

module.exports.getFiles = function (name, bootstrap, jquery, threejs) {

  return {
    html: getHtml(name, bootstrap, jquery, threejs),
    js: getJS(),
    css: getCss()
  }
}

function getHtml(name, bootstrap, jquery, threejs) {

  let scripts = [];
  let styles = [];
  if (bootstrap) {
    scripts = [...scripts, ...versions.bootstrap.scripts]
    styles = [...styles, ...versions.bootstrap.styles]
  } else if (jquery) {
    scripts = [...scripts, ...versions.jquery.scripts]
  }

  if (threejs) {
    scripts = [...scripts, ...versions.threejs.scripts]
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  ${styles.join('\n')}
  <link rel="stylesheet" type="text/css" href="${name}.css">
  <title>${name}</title>
</head>
<body>
  ${scripts.join('\n')}
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