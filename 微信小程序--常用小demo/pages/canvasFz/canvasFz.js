// pages/canvasFz/canvasFz.js
const canvasJs = require('../../utils/canvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carvasH:475,
    carvasW:375,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.canvasData()
  },
  canvasData:function(){
    let that = this;
    let carvasW = that.data.carvasW;
    let carvasH = that.data.carvasH;
    let rpx;
    wx.getSystemInfo({
      success: function (res) {
        rpx = res.windowWidth / 375
        that.setData({
          carvasW:carvasW*rpx,
          carvasH:carvasH*rpx,
        })
      },
    })
    const query = wx.createSelectorQuery();
    query.select("#myCanvas").fields({node:true,size:true}).exec(async(res)=>{
      const canvas = res[0].node
      const ctx = canvas.getContext("2d")
      canvas.width = that.data.carvasW;
      canvas.height = that.data.carvasH;
      // 背景色
      canvasJs.roundRectColor(ctx,0, 0, carvasW * rpx, carvasH * rpx,0,'#fff')
      // 礼品卡图
      let carImg = '/images/default.png';
      await canvasJs.imgs(canvas,ctx,carImg,15*rpx,15*rpx,345*rpx,195*rpx,8*rpx)
    })
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