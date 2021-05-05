<template>
  <div class="avatar-selector-dialog"
       :style="{display: isDialogShow ? 'block' : 'none'}">
    <h3>请选择头像</h3>
    <div class="avatar-list">
      <div class="avatar-item"
           :class="{active: activeId === item.id}"
           v-for="item in avatarList"
           :key="item.id"
           :style="{backgroundImage: `url(${item.url})`}"
           @click="handleAvatarClick(item.id)"></div>
    </div>
    <footer>
      <button class="btn cancel-btn"
              @click="dialogClose">取消</button>
      <button class="btn confirm-btn"
              @click="save">确定</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AvatarSelectorDialog',
  props: {
    avatarList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isDialogShow: false,
      activeId: undefined
    }
  },
  methods: {
    show (activeAvatarId) {
      this.activeId = activeAvatarId
      this.isDialogShow = true
    },
    dialogClose () {
      this.isDialogShow = false
    },
    handleAvatarClick (id) {
      this.activeId = id
    },
    save () {
      this.$emit('finish', this.activeId)
      this.dialogClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-selector-dialog {
  background: #fff;
  position: fixed;
  z-index: 999;
  width: 550px;
  height: 400px;
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  border-radius: 3px;
  user-select: none;

  h3 {
    color: #333;
    font-size: 16px;
    padding: 5px;
  }

  .avatar-list {
    display: flex;
    flex-wrap: wrap;
    height: 300px;
    overflow-y: auto;
    padding: 0 10px;

    .avatar-item {
      width: 80px;
      height: 80px;
      background-size: cover;
      background-origin: border-box;
      border: 2px solid transparent;
      cursor: pointer;

      &.active {
        border-color: #00cec9;
      }
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding: 0 20px;

    .btn {
      border: 1px solid #dfe6e9;
      width: 68px;
      height: 35px;
      border-radius: 3px;
      margin: 0 5px;
      cursor: pointer;

      &.confirm-btn {
        color: #fff;
        background: #00cec9;
      }
    }
  }
}
</style>