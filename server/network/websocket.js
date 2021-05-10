const Ws = require('ws')
const uuid = require('uuid')

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
  const userId = generateUserId()
  ws.on('message', msg => {
    handleMessage(msg, userId)
  })
  ws.on('close', () => {
    handleUserCloseConnection(userId)
  })

}

function generateUserId() {
  // 产生用户唯一id
  return uuid.v1().replace(/-/g, '')
}

function broadcastMsg({type, typeStr, msg = '', dataTime, username, avatarId}) {
  // 广播消息
  server.clients.forEach(c => {
    if(c.readyState === Ws.OPEN) {
      c.send(JSON.stringify({ type, typeStr, msg, dataTime, username, avatarId }))
    }
  })
}

function handleMessage(msg, userId) {
  const data = JSON.parse(msg)
  switch(data.type) {
    case 0:
      handleUserConnected(data, userId)
      break
    case 1:
      handleUserSendMsg(data)
  }
}

function handleUserConnected(data, userId) {
  // 新用户连接
  const { username, avatarId, dataTime } = data
  console.log(`用户${username}进入聊天室`);
  updateOnlineUserList({username, avatarId, userId})
  broadcastMsg({
    type: 0,
    typeStr: 'tip',
    msg: `用户${username}进入聊天室`,
    dataTime
  })
}

function updateOnlineUserList(userInfo) {
  // 更新在线用户列表
  const userId = userInfo.userId
  if(userId && !onlineUserList.find(item => item.userId === userId)) {
    onlineUserList.push(userInfo)
  }
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

function handleUserCloseConnection(userId) {
  // 用户断开连接
  const index = onlineUserList.findIndex(item => item.userId === userId)
  if(index !== -1) {
    onlineUserList.splice(index, 1)
    broadcastMsg({
      type: 2,
      typeStr: 'updateOnlineUserList',
      msg: onlineUserList
    })
  }
}


module.exports = init
