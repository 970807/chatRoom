const Ws = require('ws')


const server = new Ws.Server({ port: 8000 })

const init = () => {
  bindEvent()
}

function bindEvent() {
  server.on('open', handleOpen)
  server.on('close', handleClose),
  server.on('error', handleError)
  server.on('connection', handleConnection)
}

function handleOpen() {
  console.log('ws open');
}

function handleClose() {
  console.log('ws close');
}

function handleError() {
  console.log('ws error');
}

function handleConnection(ws) {
  console.log('ws connection');
  ws.on('message', handleMessage)
}

function handleMessage(msg) {
  const data = JSON.parse(msg)
  switch(data.type) {
    // 新用户连接
    case 0:
      handleUserConnected(data)
  }
}

function handleUserConnected(data) {
  server.clients.forEach(c => {
    c.send(JSON.stringify({
      type: 0,
      typeStr: 'tip',
      msg: `用户${data.username}进入聊天室`,
      time: data.dateTime
    }))
  })
}

module.exports = init
