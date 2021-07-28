// pages/imgSrc/imgSrc.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagesList: [],
    imgs: [],
    maxLength:3,
    maxSize:1024*1024,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
  },
  uploader:function(){
    let that = this;
    let imagesList = that.data.imagesList;
    let maxSize = that.data.maxSize;
    let maxLength = that.data.maxLength;
    let flag = true;
    wx.chooseImage({
      // count: maxLength,
      sizeType:['original','compressed'],
      sourceType:['camera','album'],
      success:function(res){
        console.log(res)
        if(imagesList.length + res.tempFilePaths.length > maxLength){
          wx.showModal({
            content:"最多上传"+maxLength+'张，请重新选择',
            showCancel:false,
            success:function(res){
              if(res.confirm){
                console.log(res)
              }
            }
          })
          return false;
        }
        for(let a=0;a<res.tempFiles.length;a++){
          if(res.tempFilePaths[a].size > maxSize){
            wx.showModal({
              content:"图片过大超出限制，请重新选择上传",
              showCancel:false,
              success:function(res){
                if(res.confirm){
                  console.log(res)
                }
              }
            })
            return false;
          }
        }
        that.setData({
          imagesList:imagesList.concat(res.tempFilePaths)
        })
      }
    })
  },
  deleteImg2:function(e){
    let index = e.currentTarget.dataset.index;
    let imagesList = this.data.imagesList;
    imagesList.splice(index,1)
    this.setData({
      imagesList:imagesList
    })
  },
  previewImg:function(e){
    let index = e.currentTarget.dataset.index;
    let imagesList = this.data.imagesList;
    wx.previewImage({
      current: imagesList[index],
      urls: imagesList,
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