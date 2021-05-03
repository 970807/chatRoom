<template>
  <aside>
    <h3 class="online-member">当前在线人数：{{onlineMemberCount}}</h3>
    <div class="member-list">
      <div class="item"
           v-for="(item, index) in memberList"
           :key="item.id">
        <div class="order">{{index + 1}}</div>
        <div class="avatar"></div>
        <div class="nick-name">{{item.nickName}}</div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      onlineMemberCount: 98,
      memberList: [
        {
          id: 1,
          avatar: '',
          nickName: '张三'
        },
        {
          id: 2,
          avatar: '',
          nickName: '王五'
        },
        {
          id: 3,
          avatar: '',
          nickName: '赵六'
        },
        {
          id: 4,
          avatar: '',
          nickName: '李雷'
        },
        {
          id: 5,
          avatar: '',
          nickName: '韩丹cdscdscsdcdscdscdscdscd'
        },
        {
          id: 6,
          avatar: '',
          nickName: '白居易'
        },
        {
          id: 7,
          avatar: '',
          nickName: '王薇'
        },
        {
          id: 8,
          avatar: '',
          nickName: '露娜'
        }
      ]
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