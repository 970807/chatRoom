const ws = require('nodejs-websocket')

const server = ws.createServer(conn => {
  console.log('new user connect');
  
})

server.listen(8080, () => {
  console.log('running');
})