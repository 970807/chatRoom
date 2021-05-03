<template>
  <div class="home-wrap">
    <div class="chat-box-wrap">
      <Aside />
      <main>
        <ChatBox />
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