// pages/screening/screening.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courierlist:[],
    courierlist_old:[],
    selectVal:'',
    activeIndex:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData:function(){
    let that = this;
    wx.request({
      url: 'http://wap.fuhuitianxia.cn/cheyou//tools/json_sub_ajax.ashx?action=tpgl_list&channel_name=jiaxiao&category_id=0&page_size=20',
      header:{
        "Content-Type": "applciation/json"
      },
      method:"GET",
      success:function(res){
        that.setData({
          courierlist:res.data.jiaxiao,
          courierlist_old:res.data.jiaxiao
        })
      },
    })
  },
  serachInt:function(e){
    let that = this;
    let val = e.detail.value;
    that.resultData(val);
    that.setData({
      selectVal:val
    })
  },
  resultData:function(val){
    let that = this;
    let courierlist = that.data.courierlist_old;
    let result = [];
    if(val == ''){                         
      that.setData({
        courierlist:courierlist
      })
    }else{
      for(let a=0;a<courierlist.length;a++){
        if(courierlist[a].title.indexOf(val)>=0){
          result.push(courierlist[a])
        }
      }
      that.setData({
        courierlist:result
      })
    }
  },
  itemClick:function(e){
    let textVal = e.currentTarget.dataset.title;
    let index = e.currentTarget.dataset.index;
    this.setData({
      selectVal:textVal,
      activeIndex:index,
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