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
    handleMessage(msg, userId, ws)
  })
  ws.on('close', () => {
    handleUserCloseConnection(userId)
  })

}

function generateUserId() {
  // 产生用户唯一id
  return uuid.v1().replace(/-/g, '')
}

function broadcastMsg({type, typeStr, msg = '', dateTime, username, avatarId}) {
  // 广播消息
  server.clients.forEach(c => {
    if(c.readyState === Ws.OPEN) {
      c.send(JSON.stringify({ type, typeStr, msg, dateTime, username, avatarId }))
    }
  })
}

function handleMessage(msg, userId, ws) {
  const data = JSON.parse(msg)
  if(!data.username) {
    handleSendError({msg:'用户名不能为空', ws})
    return
  }
  if(typeof data.avatarId !== 'number') {
    handleSendError({msg:'用户名头像参数错误', ws})
    return
  }
  if(!data.dateTime) {
    handleSendError({msg:'未知的时间', ws})
    return
  }
  switch(data.type) {
    case 0:
      handleUserConnected(data, userId)
      break
    case 1:
      if(!data.msg) {
        handleSendError({msg:'请输入要发送的消息', ws})
        return
      }
      handleUserSendMsg(data)
  }
}

function handleUserConnected(data, userId) {
  // 新用户连接
  const { username, avatarId, dateTime } = data
  console.log(`用户${username}进入聊天室`);
  updateOnlineUserList({username, avatarId, userId})
  broadcastMsg({
    type: 0,
    typeStr: 'tip',
    msg: `${username} 进入聊天室`,
    dateTime
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
  const { msg, dateTime, username, avatarId } = data
  broadcastMsg({
    type: 1,
    typeStr: 'userMsg',
    msg: msg,
    dateTime: dateTime,
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

function handleSendError({msg, ws}) {
  // 发生错误
  ws.send(JSON.stringify({
    type: 3,
    typeStr: 'errorTip',
    msg
  }))
}


module.exports = init
