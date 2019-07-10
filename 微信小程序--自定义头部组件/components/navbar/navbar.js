const App = getApp();
Component({
  properties:{
    title:String,
    left_show:Boolean
  },
  data:{
    navH:'',   // 高度
    left_show:false, //左侧内容是否显示
    title:"自定义标题"
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navH: App.globalData.navHeight
      })
    }
  },
  
})