const http = require('http')
const ws = require('nodejs-websocket')
const url = require('url')
const db = require('./db')

ws.createServer(conn => {
  console.log('new user connect');
}).listen(8080, () => {
  console.log('running');
})

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json;charset=utf8')
  const reqUrl = url.parse(req.url).pathname
  if(reqUrl === '/api/getAvatarList' && req.method === 'GET') {
    const avatarList = [
      {
        id: 100,
        url: 'https://z3.ax1x.com/2021/05/04/gus6eO.jpg'
      },
      {
        id: 101,
        url: 'https://z3.ax1x.com/2021/05/04/gussOK.jpg'
      },
      {
        id: 102,
        url: 'https://z3.ax1x.com/2021/05/04/gusDQx.jpg'
      },
      {
        id: 103,
        url: 'https://z3.ax1x.com/2021/05/04/gusBS1.jpg'
      },
      {
        id: 104,
        url: 'https://z3.ax1x.com/2021/05/04/gusry6.jpg'
      }
    ]
    res.end(JSON.stringify({
      code: '2000',
      data: avatarList,
      msg: '请求成功'
    }))
  }
}).listen(3000)