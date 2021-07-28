//app.js
App({
  onLaunch: function () {
    let that = this;
    wx.getSystemInfo({
      success:function(res){
        if(res.safeArea.bottom != res.screenHeight){
          that.globalData.isIPhoneX = true
        }
        that.globalData.systemInfo = res;
      },
    })
    
  },
  globalData: {
    isIPhoneX:false,
    systemInfo:''
  }
})