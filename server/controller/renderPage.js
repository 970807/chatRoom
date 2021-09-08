const fs = require('fs')
const path = require('path')

function render(fileName, resp) {
  fs.readFile(path.join(__dirname, '../public/dist/' + fileName), function(
    err,
    data
  ) {
    if (err && fileName !== 'index.html') {
      render('index.html', resp)
      return
    }
    if (err) {
      console.error(err)
      resp.writeHead(404)
      resp.end()
      return
    }
    const postfix = fileName.slice(fileName.lastIndexOf('.') + 1)
    switch (postfix) {
      case 'html':
        resp.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        break
      case 'css':
        resp.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' })
        break
      case 'js':
        resp.writeHead(200, { 'Content-Type': 'text/javascript;charset=utf-8' })
        break
    }
    resp.write(data.toString())
    resp.end()
  })
}

module.exports = render
