<template>
  <div class="send-msg-box">
    <textarea v-model="msg" />
    <div class="btns">
      <button class="send-btn" @click="handleSendBtnClick">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendMsgBox',
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    handleSendBtnClick() {
      this.$emit('sendMsg', this.msg)
      this.msg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.send-msg-box {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 160px;

  textarea {
    flex: 1;
    outline: none;
    border: none;
    resize: none;
    width: 100%;
    vertical-align: top;
    overflow: hidden;
    padding: 3px;
    font-size: 16px;
  }

  .btns {
    background: #fff;
    width: 100%;
    height: 35px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;

    .send-btn {
      border: none;
      outline: none;
      background: #f39c12;
      padding: 0 10px;
      height: 25px;
      color: #ecf0f1;
      cursor: pointer;
    }
  }
}
</style>