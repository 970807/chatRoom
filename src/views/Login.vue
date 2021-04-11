<template>
  <div class="login-wrap">
    <div class="box">
      <h3>登录聊天室</h3>
      <UserInput @unamechange="username = $event" />
      <LoginBtn :username="username" />
    </div>
  </div>
</template>

<script>
import UserInput from '@/components/login/UserInput'
import LoginBtn from '@/components/login/LoginBtn'
export default {
  name: 'Login',
  components: {
    UserInput,
    LoginBtn
  },
  data () {
    return {
      username: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  min-width: 500px;
  min-height: 100vh;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 350px;
    height: 200px;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    padding: 0 45px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    transform: translateY(-6vh);
    color: #00b894;

    h3 {
      color: #2d3436;
      text-align: center;
      padding: 10px 0 26px 0;
      letter-spacing: 4px;
      user-select: none;
    }
  }
}
</style>