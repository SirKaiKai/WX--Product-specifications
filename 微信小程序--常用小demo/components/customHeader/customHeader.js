// components/customHeader/customHeader.js
const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'',
    },
    leftShow:{
      type:Boolean,
      value:true
    },
    color:{
      type:String,
      value:'#333'
    },
    background:{
      type:String,
      value:"#fff"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIPhoneX:false,
    navH: '',
    navHBox: '',
    pages:'',
    syUrl:'pages/index/index',//首页路径
  },
  attached(){
    let that = this;
    let systemInfo = App.globalData.systemInfo;
    let pages = getCurrentPages();
    that.setData({
      navH:systemInfo.statusBarHeight,
      navHBox:systemInfo.statusBarHeight + systemInfo.screenWidth * 88 / 750,
      pages:pages.length
    })
    // 判断是否为首页
    let route = pages[pages.length - 1].route;
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack:function(){
      if(this.data.pages == 1){
        tt.reLaunch({
          url:'/'+this.data.syUrl
        })
      }else if(this.data.pages > 1){
        tt.navigateBack({
          delta:1,
        })
      }
    }
  }
})
