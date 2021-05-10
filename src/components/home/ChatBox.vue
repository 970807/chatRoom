<template>
  <div class="chat-box">
    <h3 class="headline">消息记录 ({{msgCount}})</h3>
    <ul class="msg-area">
      <template v-for="(item, index) in msgList">
        <li v-if="item.type === 0"
            class="tip-item"
            :key="index">
          <p class='text'>{{item.msg}} {{item.dateTime}}</p>
        </li>
        <li v-else-if="item.type === 1"
            class="msg-item"
            :key="index">
          <div class="info">
            <div class="avatar"
                 :style="{backgroundImage: `url(${getAvatarUrl(item.avatarId)})`}"></div>
            <span class="nick-name">{{item.username}}</span>
            <span class="time">{{item.dateTime}}</span>
          </div>
          <p class="text">{{item.msg}}</p>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  props: {
    msgList: {
      type: Array,
      default: () => []
    },
    avatarList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    msgCount () {
      return this.msgList.filter(item => item.type === 1).length
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
.chat-box {
  width: 600px;
  height: 400px;
  background: #dff9fb;
  display: flex;
  flex-direction: column;

  .headline {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    padding: 8px 0;
    background: #f1f2f6;
    color: #2f3542;
  }

  .msg-area {
    flex: 1;
    font-size: 15px;
    overflow-y: auto;
    color: #333;

    .msg-item {
      padding: 5px 5px 8px 5px;

      .info {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        .avatar {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          border: 1px solid orange;
          background-size: cover;
        }

        .nick-name {
          padding: 0 4px;
        }
      }

      .text {
        text-indent: 0.5em;
      }
    }

    .tip-item {
      padding: 10px 0;

      .text {
        font-size: 14px;
        color: #7f8c8d;
        text-align: center;
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