// pages/imgSrc/imgSrc.js
const app = getApp();
const wxbarcode = require("../../utils/eqr.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagesList: [],
    imgs: [],
    maxLength:3,
    maxSize:1024*1024,
    codeInfo:{},
    inputCode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
  sweepCode:function(e){
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success:function(res){
        console.log(res)
        wx.showToast({
          title: '扫描成功',
          duration:1000
        })
        that.setData({
          codeInfo:res
        })
      }
    })
  },
  inputChange:function(e){
    this.setData({
      inputCode:e.detail.value
    })
  },
  codeSetting:function(e){
    let inputCode = this.data.inputCode;
    if(inputCode==''){
      wx.showModal({
        content:"内容不能为空，请输入",
        showCancel:false,
        success:function(res){
          if(res.confirm){
            console.log(res)
          }
        }
      })
      return false;
    }
    wxbarcode.barcode('barcode', inputCode, 690,200);
    wxbarcode.qrcode('qrcode', inputCode, 200, 200);
    const fileManager = wx.getFileSystemManager();
    wx.downloadFile({
      url:'https://cdn.thickinto.com/rdo/mall/ticket/673f1b5d1c9b36966eb4a7fbf8d19971/just.svg',
      success: ({ tempFilePath }) => {
        let fileData = fileManager.readFileSync(tempFilePath, 'base64');
        console.log(`data:image/svg+xml;base64,${fileData}`)
        this.setData({
          svgSrc: `data:image/svg+xml;base64,${fileData}`
        });
      }
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