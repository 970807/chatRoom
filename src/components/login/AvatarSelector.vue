<template>
  <div class="avatar-selector">
    <span>头像</span>
    <div class="avatar"
         :style="{backgroundImage: `url(${activeAvatarUrl})`}"
         @click="handleAvatarClick"></div>
    <AvatarSelectorDialog ref='avatarSelectorDialog'
                          :avatarList="avatarList"
                          @finish="handleSelectAvatarFinish" />
  </div>
</template>

<script>
import AvatarSelectorDialog from './AvatarSelectorDialog'
import { getAvatarList } from '@/api/index'
export default {
  name: 'AvatarSelector',
  components: {
    AvatarSelectorDialog
  },
  computed: {
    activeAvatarUrl () {
      let url = ''
      const res = this.avatarList.find(item => item.id === this.activeAvatarId)
      if (res) {
        url = res.url
      }
      return url
    }
  },
  data () {
    return {
      avatarList: [],
      activeAvatarId: undefined
    }
  },
  created () {
    this.getAvatarList()
    const user = this.$store.state.user || JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      this.activeAvatarId = user.avatarId
      this.updateAvatarId(user.avatarId)
    }
  },
  methods: {
    handleAvatarClick () {
      this.$refs.avatarSelectorDialog.show(this.activeAvatarId)
    },
    getAvatarList () {
      getAvatarList().then(res => {
        const avatarList = res.data
        if (avatarList.length > 0) {
          this.avatarList = avatarList
          if (this.activeAvatarId) return
          // 随机选中头像
          const randomActiveAvatarIndex = Math.floor(Math.random() * avatarList.length)
          const activeAvatarId = avatarList[randomActiveAvatarIndex].id
          this.activeAvatarId = activeAvatarId
          this.updateAvatarId(activeAvatarId)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleSelectAvatarFinish (activeAvatarId) {
      this.activeAvatarId = activeAvatarId
      this.updateAvatarId(activeAvatarId)
    },
    updateAvatarId (avatarId) {
      this.$emit('updateAvatarId', avatarId)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-selector {
  display: flex;
  font-size: 18px;
  margin-top: 40px;

  span {
    line-height: 30px;
    padding-right: 6px;
    letter-spacing: 1px;
    user-select: none;
  }

  .avatar {
    border: 2px solid #00b894;
    width: 50px;
    height: 50px;
    margin-left: 1em;
    cursor: pointer;
    background-size: cover;
  }
}
</style>