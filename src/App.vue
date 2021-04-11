<template>
  <div id="app">
    <router-view />
    <Message v-for="(item, index) in msgList"
             :key="item.id"
             v-bind="item"
             :top="20 + 60 * index"
             @finish="onMessageFinish" />
  </div>
</template>

<script>
import Vue from 'vue'
import Message from '@/components/common/Message'
export default {
  name: 'App',
  components: {
    Message
  },
  created () {
    this.initMessageFn()
  },
  data () {
    return {
      msgList: [],
      msgCount: 0
    }
  },
  methods: {
    /* 
      定义全局$message提示方法
    */
    initMessageFn () {
      const fn = options => {
        options.id = ++this.msgCount
        this.msgList.push(options)
      }
      fn.info = message => {
        const options = {
          type: 'info',
          message
        }
        fn(options)
      }
      fn.success = message => {
        const options = {
          type: 'success',
          message
        }
        fn(options)
      }
      fn.warning = message => {
        const options = {
          type: 'warning',
          message
        }
        fn(options)
      }
      fn.error = message => {
        const options = {
          type: 'error',
          message
        }
        fn(options)
      }
      Vue.prototype.$message = fn
    },
    /* 
      message展示完成，移除message
    */
    onMessageFinish (id) {
      const targetIdx = this.msgList.findIndex(item => item.id === id)
      if (targetIdx === -1) return
      this.msgList.splice(targetIdx, 1)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
</style>