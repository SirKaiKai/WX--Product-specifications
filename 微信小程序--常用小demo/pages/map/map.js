// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地图标注
    markers: [{
      iconPath: "/images/dt_bj.png",
      id: 0,
      latitude: 34.7672810000,
      longitude: 113.7709430000,
      width: 30,
      height: 30,
      callout: {
        "display": "ALWAYS",
        "content": "公司地址",
        "color": "#fff",
        "bgColor": "#000",
        "padding": "14rpx",
        "borderRadius": "30px",
        "fontSize": "24rpx"
      }
    }]

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