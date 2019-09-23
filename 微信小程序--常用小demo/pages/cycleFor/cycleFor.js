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
    index1: ""
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
    var time = 12000;
    setInterval(function() {
      if (time > 0) {
        time = time - 1000;
        var h = Math.floor(time / 1000 / 60 / 60);
        if(h<10){h="0"+h}
        var m = Math.floor(time / 1000 / 60 % 60);
        if (m < 10) { m = "0" + m }
        var s = Math.floor(time / 1000 % 60);
        if (s < 10) { s = "0" + s}
        console.log(h, m, s)
      }else{
        console.log("结束")
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