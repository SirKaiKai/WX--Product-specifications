// pages/scroll/scroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: -1,//切换焦点
    block1: "",  //第一部分高度
    block2: "", //第2部分高度
    block3: "", //第3部分高度
    banbie:[]
  },
  // 判断滚动条距离,是否显示切换
  onPageScroll: function (e) {
    if (e.scrollTop == 0) {
      this.setData({
        useDetails: false,
        currentData:-1
      })
    } else if (e.scrollTop > 10){
      this.setData({
        useDetails: true
      })
    }
  },
  goodsTab: function (e) {
    var that = this;
    console.log(e.target.dataset.current)
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    if (e.target.dataset.current == 0) {
      wx.pageScrollTo({
        scrollTop: 20
      })
    } else if(e.target.dataset.current == 1) {
      wx.pageScrollTo({
        scrollTop: that.data.block1
      })
    }else{
      wx.pageScrollTo({
        scrollTop: that.data.block1 + that.data.block2
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://wap.fuhuitianxia.cn/cheyou//tools/json_sub_ajax.ashx?action=tpgl_list&channel_name=jiaxiao&category_id=0&page_size=20', //请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.jiaxiao)
        that.setData({
          banbie: res.data.jiaxiao
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // 判断第一部分高度
    var query = wx.createSelectorQuery() //创建节点查询器 query
    query.select('#block1').boundingClientRect() //这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
    query.exec(function (rect) {
      that.setData({
        block1: rect[0].height
      })
    });
    // 判断2高度
    var query2 = wx.createSelectorQuery() //创建节点查询器 query
    query2.select('#block2').boundingClientRect() //这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
    query2.exec(function (rect) {
      that.setData({
        block2: rect[0].height
      })
    });
    // 判断3高度
    var query3 = wx.createSelectorQuery() //创建节点查询器 query
    query3.select('#block3').boundingClientRect() //这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
    query3.exec(function (rect) {
      that.setData({
        block3: rect[0].height
      })
    });
    // 判断动态数据高度
    setTimeout(function(){
      var query4 = wx.createSelectorQuery() //创建节点查询器 query
      query4.select('#banbie').boundingClientRect() //这段代码的意思是选择Id= the - id的节点，获取节点位置信息的查询请求
      query4.exec(function (rect) {
        console.log(rect[0].height)
      });
    },500)
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