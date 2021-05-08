function getAvatarList(resp) {
  const avatarList = [
    {
      id: 100,
      url: 'https://z3.ax1x.com/2021/05/04/gus6eO.jpg'
    },
    {
      id: 101,
      url: 'https://z3.ax1x.com/2021/05/04/gussOK.jpg'
    },
    {
      id: 102,
      url: 'https://z3.ax1x.com/2021/05/04/gusDQx.jpg'
    },
    {
      id: 103,
      url: 'https://z3.ax1x.com/2021/05/04/gusBS1.jpg'
    },
    {
      id: 104,
      url: 'https://z3.ax1x.com/2021/05/04/gusry6.jpg'
    }
  ]
  resp.end(JSON.stringify({
    code: '2000',
    data: avatarList,
    msg: '请求成功'
  }))
}

module.exports = getAvatarList