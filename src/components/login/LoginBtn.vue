<template>
  <button class="login-btn"
          :class="{'is-loading': btnLoading}"
          @click="onLogin">
    <i class="login-icon iconfont icon-mimadenglu"
       v-if="!btnLoading"></i>
    <i class="loading-icon iconfont icon-Loading"
       v-else></i>
    登录
  </button>
</template>

<script>
export default {
  name: 'LoginBtn',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      btnLoading: false
    }
  },
  methods: {
    onLogin () {
      if (!this.username) {
        this.$message.warning('用户名不能为空')
        return
      }
      this.$store.commit('login', this.username)
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  height: 40px;
  margin-top: 34px;
  border: none;
  outline: none;
  background: #00b894;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 1px;
  user-select: none;
  position: relative;

  &.is-loading {
    pointer-events: none;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
    }
  }

  .login-icon {
    font-size: 18px;
  }

  .loading-icon {
    display: inline-block;
    font-size: 17px;
    animation: rotating 2s linear infinite;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>