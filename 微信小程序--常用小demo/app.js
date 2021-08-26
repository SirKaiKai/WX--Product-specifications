//app.js
import regeneratorRuntime from "./utils/runtime";
//解决regeneratorRuntime is not defined
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