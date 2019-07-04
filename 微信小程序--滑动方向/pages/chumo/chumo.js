// pages/chumo/chumo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ballTop:0,
    ballLeft:0,
    screenHeight: 0,
    screenWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // 一是会将按钮拖出屏幕边缘，
    // 二是按钮始终在鼠标右下方。
    // 获取屏幕宽高
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
        console.log(res.windowHeight,res.windowWidth)
      }
    });
  },
  // 拖拽
  handletouchmove: function (event) {
    console.log(event.touches[0].pageX, event.touches[0].pageY)
    console.log(event.touches[0].clientX, event.touches[0].clientY)
    let pageX = event.touches[0].pageX;
    let pageY = event.touches[0].pageY;
    //屏幕边界判断   中心点位置
    if (pageX < 30 || pageY < 30)
      return;
    if (pageX > this.data.screenWidth - 30)
      return;
    if (pageY > this.data.screenHeight - 30)
      return;

    //左上角位置
    this.setData({
      ballTop: event.touches[0].pageY - 30,
      ballLeft: event.touches[0].pageX - 30,
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})