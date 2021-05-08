const Ws = require('ws')


const server = new Ws.Server({ port: 8000 })

const onlineUserList = []

const init = () => {
  bindEvent()
  console.log('websocket初始化成功', 'ws://localhost:8000');
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
  ws.on('close', handleUserCloseConnection)

}

server.on('ping', () => {
  console.log('1');
})

function broadcastMsg({type, typeStr, msg = '', dataTime, username, avatarId}) {
  // 广播消息
  server.clients.forEach(c => {
    if(c.readyState === Ws.OPEN) {
      c.send(JSON.stringify({ type, typeStr, msg, dataTime, username, avatarId }))
    }
  })
}

function handleMessage(msg) {
  const data = JSON.parse(msg)
  switch(data.type) {
    case 0:
      handleUserConnected(data)
      break
    case 1:
      handleUserSendMsg(data)
  }
}

function handleUserConnected(data) {
  // 新用户连接
  const { username, avatarId, dataTime } = data
  console.log(`用户${username}进入聊天室`);
  updateOnlineUserList(username, avatarId)
  broadcastMsg({
    type: 0,
    typeStr: 'tip',
    msg: `用户${username}进入聊天室`,
    dataTime
  })
}

function updateOnlineUserList(username, avatarId) {
  // 更新在线用户列表
  onlineUserList.push({ username, avatarId })
  broadcastMsg({
    type: 2,
    typeStr: 'updateOnlineUserList',
    msg: onlineUserList
  })
}

function handleUserSendMsg(data) {
  // 接收到用户发送的消息
  const { msg, dataTime, username, avatarId } = data
  broadcastMsg({
    type: 1,
    typeStr: 'userMsg',
    msg: msg,
    dataTime: dataTime,
    username: username,
    avatarId: avatarId
  })
}

function handleUserCloseConnection() {
  // 用户断开连接
  
}


module.exports = init
