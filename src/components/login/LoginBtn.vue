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
  data () {
    return {
      btnLoading: false
    }
  },
  methods: {
    onLogin () {
      this.$emit('onLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  height: 40px;
  margin-top: 28px;
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