<template>
  <div class="home-wrap">
    <div class="chat-box-wrap">
      <Aside :onlineUserList="onlineUserList"
             :avatarList="avatarList" />
      <main>
        <ChatBox :msgList="msgList"
                 :avatarList="avatarList" />
        <SendMsgBox @sendMsg="handleSendMsg" />
      </main>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/home/Aside'
import ChatBox from '@/components/home/ChatBox'
import SendMsgBox from '@/components/home/SendMsgBox'
import { getAvatarList } from '@/api/index'
export default {
  name: 'Home',
  components: {
    Aside,
    ChatBox,
    SendMsgBox
  },
  data () {
    return {
      user: {},
      socket: null,
      msgList: [],
      onlineUserList: [],
      avatarList: []
    }
  },
  created () {
    const user = this.$store.state.user || JSON.parse(sessionStorage.getItem('user'))
    if (!user.username) {
      this.$router.replace('/login')
      this.$message.error('用户名不能为空！')
      return
    }
    this.user = user
    this.connectWebSocket()
    this.getAvatarList()
  },
  methods: {
    getAvatarList () {
      // 获取头像列表
      getAvatarList().then(res => {
        this.avatarList = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    sengMsg ({ type, typeStr, msg = '' }) {
      this.socket.send(JSON.stringify({
        type,
        typeStr,
        username: this.user.username,
        avatarId: this.user.avatarId,
        dateTime: Date.now(),
        msg
      }))
    },
    handleSendMsg (msg) {
      // 发送消息按钮被单击
      this.sengMsg({
        type: 1,
        typeStr: 'sendMsg',
        msg
      })
    },
    handleWsOpen () {
      // 首次进入home页，发送用户登陆相关信息
      this.sengMsg({
        type: 0,
        typeStr: 'login'
      })
    },
    connectWebSocket () {
      const url = process.env.NODE_ENV ===
        'development' ? 'ws://localhost:8000' : 'ws://chatroom.ggh0807.cn:8000'
      const ws = new WebSocket(url)
      this.socket = ws
      ws.addEventListener('open', this.handleWsOpen.bind(this), false)
      ws.addEventListener('close', this.handleWsClose.bind(this), false)
      ws.addEventListener('error', this.handleWsError.bind(this), false)
      ws.addEventListener('message', this.handleWsMessage.bind(this), false)
    },
    handleWsClose () {
      this.$message.error('websocket断开连接')
    },
    handleWsError (e) {
      console.log('ws error', e);
      this.$message.error('未知错误')
    },
    handleWsMessage (e) {
      // 接收到服务端发送的消息
      const data = JSON.parse(e.data)
      if (data.type === 0 || data.type === 1) {
        this.msgList.push(data)
      } else if (data.type === 2) {
        // 更新在线用户列表
        this.onlineUserList = data.msg
      } else if (data.type === 3) {
        // 错误提示
        this.$message.error(data.msg)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  padding-top: 6vh;
  box-sizing: border-box;

  .chat-box-wrap {
    display: flex;
    background: #ecf0f1;
    height: 560px;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
}
</style>