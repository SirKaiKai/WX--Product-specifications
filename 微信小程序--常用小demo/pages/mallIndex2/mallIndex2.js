// pages/catering.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tabsList:[
      {
        name:'A类',
        list:[{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"},{anchor: "a"}]
      },
      {
        name:'B类',
        list:[{anchor: "b"},{anchor: "b"},{anchor: "b"}]
      },
      {
        name:'C类',
        list:[{anchor: "c"},{anchor: "c"},{anchor: "c"}]
      },
      {
        name:'D类',
        list:[{anchor: "d"},{anchor: "d"},{anchor: "d"}]
      },
      {
        name:'E类',
        list:[{anchor: "e"}]
      },
      {
        name:'F类',
        list:[]
      }
    ],
    indexId: 0,
    toTitle:"title-0",
    scrollTop:0,
    top:[],
    ordersHeight:'',
    moreHeight:'',
    menuClick:'',
  },
  // 左侧点击事件
  jumpIndex(e) {
    let index = e.currentTarget.dataset.menuindex;
    let that = this;
    that.setData({
      indexId: index,
      toTitle: "title-" + index,
      menuClick:true,
      scrollChange: index == 0 ? false : true
    });
    //可以设置定位事件
  
  },
  //滚动事件  
  scroll(res){
    let top=res.detail.scrollTop;
    let that = this;
    this.setData({
      scrollTop: top
    })
    var length = this.data.top.length;
    // for(var i=0;i<this.data.top.length;i++){
    //   if (this.data.top[i] - this.data.top[0] <= this.data.scrollTop && (i < length-1  && this.data.top[i + 1] - this.data.top[0] > this.data.scrollTop)){
    //     console.log(i)
    //     if(this.data.indexId!=i){
    //       this.setData({
    //         indexId: i,
    //       }); 
    //     }
    //   }
    // }
    if(that.data.menuClick == true){
      that.setData({
        menuClick:false
      })
    }else{
      for(let a=0;a<length;a++){
        if(that.data.top[a] <= that.data.scrollTop && that.data.scrollTop < that.data.top[a+1] || a==length-1 && that.data.top[a] < that.data.scrollTop){
          // console.log(that.data.top[a],that.data.scrollTop,that.data.top[a+1],a)
          if(that.data.indexId != a){
            that.setData({indexId:a})
          }
        }
      }
    }
  },

  // scrollBottom(e){
  //   var that = this;
  //   console.log("触底")
  //   that.setData({
  //     indexId:that.data.tabsList.length - 2
  //   })
  // },
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      
      // 数组监听放于获取数据之后
      that.listening()
    },
    // 数组监听
    listening:function(){
      var that = this;
      // 待数据加载完毕后执行

      // 添加空数组 监听最后一个分类高度
      // var sz = {};
      // that.setData({
      //   tabsList:that.data.tabsList.concat(sz)
      // })
      wx.getSystemInfo({
        success: function (res) {
          that.setData({winHeight: res.windowHeight});
          // 获取单个商品高度
          wx.createSelectorQuery().select('.orders').boundingClientRect(function (rect) {
            that.setData({ordersHeight:rect.height})
           }).exec();
          //  获取分类高度集合
          var top2=new Array();
          for(var i=0;i<that.data.tabsList.length;i++){
            wx.createSelectorQuery().select('#view-' + i).boundingClientRect(function (rect) {
              var isTop=Number(rect.top);
              // console.log(rect)
              top2.push(isTop);
             }).exec();
          } 
          that.setData({top: top2});
          //  判断‘最后一块的高度’
          setTimeout(function(){
            if(top2[that.data.tabsList.length] - top2[that.data.tabsList.length - 1] < that.data.winHeight){
              that.setData({moreHeight:that.data.winHeight - (top2[that.data.tabsList.length] - top2[that.data.tabsList.length - 1])})
            }
          },1000)
        }       
      });     
    },
})
