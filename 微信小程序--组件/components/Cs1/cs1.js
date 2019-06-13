// components/Cs1/cs1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    SH:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    SH:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gb: function (e) {
      this.setData({
        SH: true,
      })
    },
  }
})
