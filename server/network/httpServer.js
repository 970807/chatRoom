const http = require('http')
const url = require('url')
const getAvatarList = require('../controller/getAvatarList')

const init = () => {
  http.createServer((req, resp) => {
    resp.setHeader('Access-Control-Allow-Origin', '*')
    resp.setHeader('Content-Type', 'application/json;charset=utf8')
    const reqUrl = url.parse(req.url).pathname
    if(reqUrl === '/api/getAvatarList' && req.method === 'GET') {
      getAvatarList(resp)
    }
  }).listen(3000, () => {
    console.log('http服务初始化成功', 'http://localhost:3000');
  })
}

module.exports = init
