const http = require('http')
const url = require('url')
const render = require('../controller/renderPage')
const getAvatarList = require('../controller/getAvatarList')

const init = () => {
  http
    .createServer((req, resp) => {
      resp.setHeader('Access-Control-Allow-Origin', '*')
      resp.setHeader('Content-Type', 'application/json;charset=utf8')
      const reqUrl = url.parse(req.url).pathname
      if (reqUrl === '/api/getAvatarList' && req.method === 'GET') {
        getAvatarList(resp)
        return
      }
      if (reqUrl === '/' && req.method === 'GET') {
        render('/index.html', resp)
        return
      }
      if (req.method === 'GET') {
        render(url.parse(req.url).pathname, resp)
      }
    })
    .listen(3002, () => {
      console.log('http服务初始化成功')
    })
}

module.exports = init
