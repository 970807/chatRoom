<template>
  <div class="message"
       :class="type"
       :style="{top: top + 'px'}">
    <i class="icon iconfont"
       :class="iconClass"></i>
    <p class="content">{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    message: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 20
    }
  },
  created () {
    // 3 秒后自动关闭message
    this.autoClose(3000)
  },
  computed: {
    iconClass () {
      const iconClassList = [
        {
          type: 'info',
          className: 'icon-info'
        },
        {
          type: 'success',
          className: 'icon-success'
        },
        {
          type: 'warning',
          className: 'icon-warning'
        },
        {
          type: 'error',
          className: 'icon-error_3'
        }
      ]
      const res = iconClassList.find(item => item.type === this.type)
      let className = iconClassList[0].className // 默认icon为第一个
      if (res) {
        className = res.className
      }
      return className
    }
  },
  methods: {
    /* 
      自动关闭message
    */
    autoClose (duration) {
      setTimeout(() => {
        this.$emit('finish', this.id)
      }, duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  min-width: 380px;
  background: #edf2fc;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px 15px 15px 20px;
  z-index: 2021;
  color: #909399;
  transition: top 0.4s, transform 2s;
  animation: tranformAnimation 0.2s;
  user-select: none;

  &.success {
    color: #67c23a;
    border-color: #e1f3d8;
    background: #f0f9eb;
  }

  &.warning {
    color: #e6a23c;
    border-color: #faecd8;
    background: #fdf6ec;
  }

  &.error {
    color: #f56c6c;
    border-color: #fde2e2;
    background: #fef0f0;
  }

  .icon {
    margin-right: 5px;
  }

  .content {
    font-size: 14px;
  }
}

@keyframes tranformAnimation {
  from {
    transform: translate(-50%, -30px);
  }

  to {
    transform: translate(-50%, 0);
  }
}
</style>