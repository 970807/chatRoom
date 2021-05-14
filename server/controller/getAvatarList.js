const db = require('../db/index')

function getAvatarList(resp) {
  db.base('select * from avatarlist', []).then(avatarList => {
    resp.end(JSON.stringify({
      code: '2000',
      data: avatarList,
      msg: '请求成功'
    }))
  }).catch(err => {
    console.warn(err);
    resp.end(JSON.stringify({
      code: '400',
      data: null,
      msg: '未知错误'
    }))
  })
  
}

module.exports = getAvatarList