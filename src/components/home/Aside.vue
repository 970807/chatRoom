<template>
  <aside>
    <h3 class="online-member">当前在线人数：{{onlineUserList.length}}</h3>
    <div class="member-list">
      <div class="item"
           v-for="(item, index) in onlineUserList"
           :key="item.id">
        <div class="order">{{index + 1}}</div>
        <div class="avatar"
             :style="{backgroundImage: `url(${getAvatarUrl(item.avatarId)})`}"></div>
        <div class="nick-name">{{item.username}}</div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    onlineUserList: {
      type: Array,
      default: () => []
    },
    avatarList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getAvatarUrl (avatarId) {
      let avatarUrl = ''
      const res = this.avatarList.find(item => item.id === avatarId)
      if (res) {
        avatarUrl = res.url
      }
      return avatarUrl
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: 255px;
  cursor: pointer;
  user-select: none;

  .online-member {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    padding: 8px 0;
    background: #2c3e50;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .member-list {
    flex: 1;
    overflow-y: auto;

    .item {
      display: flex;
      align-items: center;
      padding: 10px;
      background: #dff9fb;
      border-bottom: 1px solid #c7ecee;
      transition: 0.2s;

      &:hover {
        background: #f6e58d;
      }

      .order {
        flex-shrink: 0;
        background: #ffbe76;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 50%;
        font-size: 14px;
        color: #fff;
      }

      .avatar {
        flex-shrink: 0;
        width: 55px;
        height: 55px;
        margin: 0 15px 0 10px;
        border-radius: 50%;
        border: 1px solid #7ed6df;
        background-size: cover;
      }

      .nick-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 6px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}

::-webkit-scrollbar-thumb {
  background: #9aecdb;
  border-radius: 100px;
}
</style>