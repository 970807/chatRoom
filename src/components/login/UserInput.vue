<template>
  <label>
    <span>用户名</span>
    <div class="input-wrap">
      <input type="text"
             class="uname-input"
             v-model="username"
             placeholder="请输入用户名"
             autofocus />
      <span class="count">{{username.length}}/10</span>
      <i class="clear-icon iconfont icon-guanbi"
         v-show="username.length > 0"
         @click="onClearInput"></i>
    </div>
  </label>
</template>

<script>
export default {
  name: 'UserInput',
  data () {
    return {
      username: ''
    }
  },
  watch: {
    username (v) {
      // 用户名最大长度为10
      if (v.length > 10) {
        this.username = v.slice(0, 10)
      }
      this.$emit('unamechange', v)
    }
  },
  methods: {
    onClearInput () {
      this.username = ''
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  font-size: 18px;
  span {
    line-height: 30px;
    padding-right: 6px;
    letter-spacing: 1px;
    user-select: none;
  }

  .input-wrap {
    width: 285px;
    display: inline-block;
    position: relative;
    .uname-input {
      border: none;
      border-bottom: 1px solid #00b894;
      outline: none;
      width: 100%;
      padding: 8px 30px 8px 8px;
      color: inherit;
      font-size: inherit;
      box-sizing: border-box;
      &:focus ~ .clear-icon {
        display: block;
      }
    }

    .count {
      position: absolute;
      color: #909399;
      font-size: 12px;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .clear-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-5px, -50%);
      display: none;
      cursor: pointer;
    }

    &:hover .clear-icon {
      display: block;
    }
  }
}
</style>