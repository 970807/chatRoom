<template>
  <div class="home-wrap">
    <div class="chat-box-wrap">
      <Aside />
      <main>
        <ChatBox :msgList="msgList" />
        <SendMsgBox />
      </main>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/home/Aside'
import ChatBox from '@/components/home/ChatBox'
import SendMsgBox from '@/components/home/SendMsgBox'
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
      msgList: []
    }
  },
  created () {
    const user = this.$store.state.user
    if (!user.username) {
      this.$router.replace('/login')
      this.$message.error('用户名不能为空！')
      return
    }
    this.user = user
    this.connectWebSocket()
  },
  methods: {
    connectWebSocket () {
      const ws = new WebSocket('ws://localhost:8000')
      this.socket = ws
      ws.addEventListener('open', this.handleWsOpen.bind(this), false)
      ws.addEventListener('close', this.handleWsClose.bind(this), false)
      ws.addEventListener('error', this.handleWsError.bind(this), false)
      ws.addEventListener('message', this.handleWsMessage.bind(this), false)
    },
    handleWsOpen (e) {
      const ws = e.target
      ws.send(JSON.stringify({
        type: 0,
        typeStr: 'login',
        username: this.user.username,
        avatarId: this.user.avatarId,
        dateTime: Date.now()
      }))
    },
    handleWsClose (e) {
      console.log('ws close', e);
    },
    handleWsError (e) {
      console.log('ws error', e);
    },
    handleWsMessage (e) {
      const data = JSON.parse(e.data)
      switch (data.type) {
        // 提示信息
        case 0:
          this.handleTipMsg(data)
      }
    },
    handleTipMsg (data) {
      this.msgList.push(data)
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