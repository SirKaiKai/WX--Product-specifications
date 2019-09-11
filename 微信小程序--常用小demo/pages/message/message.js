// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageIndex:0,
    messageList: [{
        text: "这是第一段测试文字"
      },
      {
        text: "这是第二段文字测试"
      },
      {
        text: "测试文字这是第三段"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    setInterval(function(){
      var length = that.data.messageList.length
      if (that.data.messageIndex == length-1){
        that.setData({
          messageIndex:0
        })
      }else{
        that.setData({
          messageIndex: that.data.messageIndex + 1
        })
      }
    },5000)
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