// pages/gwc/gwc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    properties: [{
        id: 1,
        name: "1",
        childsCurGoods: [{
            id: 1,
            name: "1-1"
          },
          {
            id: 2,
            name: "1-2"
          },
        ]
      },
      {
        id: 2,
        name: "2",
        childsCurGoods: [{
            id: 1,
            name: "2-1"
          },
          {
            id: 2,
            name: "2-2"
          },
        ]
      }
    ]
  },
  clickMenu: function (event) {
    let that = this
    // console.log(event)
    let selectIndex = event.currentTarget.dataset.selectIndex;
    let attrIndex = event.currentTarget.dataset.attrIndex;
    let content = event.currentTarget.dataset.content
    var count = content[selectIndex].childsCurGoods.length;
    for (var i = 0; i < count; i++) {
      content[selectIndex].childsCurGoods[i].isSelect = false
    }
    content[selectIndex].childsCurGoods[attrIndex].isSelect = true;
    // 必须重新渲染数据----------为了添加isSelect属性
    that.setData({
      properties: content
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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