// pages/cycleFor/cycleFor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    twoList: [{
        id: "00",
        name: "1-1",
        oneList: [{
            id: "11",
            name: "0-2-1"
          },
          {
            id: "12",
            name: "0-2-2"
          }
        ]
      },
      {
        id: "00",
        name: "1-2",
        oneList: [{
            id: "21",
            name: "1-2-1"
          },
          {
            id: "22",
            name: "1-2-2"
          }
        ]
      }
    ],
    index1: "",
    djs: [{
        time: 36000000,
      },
      {
        time: 72003211
      },
      {
        time: 666666666
      }
    ],
  },
  btn: function(e) {
    this.setData({
      index1: e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 这里使用的毫秒，如果是后台传过来的时间差则是秒，注意换算单位
    this.diff_time()
  },
  diff_time: function(time) {
    var that = this;
    var diffSz = that.data.djs;
    setInterval(function() {
      for (var a = 0; a < diffSz.length; a++) {
        diffSz[a].time = diffSz[a].time - 1000;
        if (diffSz[a].time > 0) {
          var h = Math.floor(diffSz[a].time / 1000 / 60 / 60);
          if (h < 10) {
            h = "0" + h
          }
          var m = Math.floor(diffSz[a].time / 1000 / 60 % 60);
          if (m < 10) {
            m = "0" + m
          }
          var s = Math.floor(diffSz[a].time / 1000 % 60);
          if (s < 10) {
            s = "0" + s
          }
          // console.log(a,h,m,s)
          let date = {
            h: h,
            m: m,
            s: s
          }
          diffSz[a].date = date
          that.setData({
            djs: diffSz
          })
        } else {
          console.log("结束")
        }
      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})