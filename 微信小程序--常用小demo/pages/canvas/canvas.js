// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHide: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var rpx;
    var that = this;
    // 判断
    var text = "这里是你要输入的心灵鸡汤语录，例如人生四大喜事：久旱逢甘露，他乡遇故知，洞房花烛夜，金榜题名时。"; //这是要绘制的文本
    var textLength = text.length
    var moreHang = Math.ceil(textLength / 12) - 2
    var moreHeight = moreHang * 16
    wx.getSystemInfo({
      success: function (res) {
        if (res.windowWidth > 420) {
          rpx = 420 / 375
        } else {
          rpx = res.windowWidth / 375
        }
        that.setData({
          height: 1030 + moreHeight * 2
        })
      },
    })
    var mc = wx.createCanvasContext("my-canvas", this)

    // 整体背景图
    mc.setFillStyle('white')
    var height = this.data.height
    mc.fillRect(0, 0, 375 * rpx, height * rpx)
    // 内容背景图
    mc.lineJoin = "round";
    mc.setFillStyle('white')
    mc.fillRect(15 * rpx, 15 * rpx, 345 * rpx, (480 + moreHeight) * rpx)
    // 边框
    mc.setStrokeStyle('#CBAA8F')
    mc.strokeRect(15 * rpx, 15 * rpx, 345 * rpx, (480 + moreHeight) * rpx)
    // 上横线
    mc.beginPath()
    mc.setLineWidth(1)
    mc.moveTo(35 * rpx, 45 * rpx)
    mc.lineTo(115 * rpx, 45 * rpx)
    mc.setStrokeStyle('#CBAA8F')
    mc.stroke()
    // 时间
    mc.setFillStyle('#CBAA8F')
    mc.setFontSize(14 * rpx)
    var date = "2019/09";
    mc.fillText(date, 40 * rpx, 70 * rpx)
    // 天
    mc.setFillStyle('#CBAA8F')
    mc.font = 'normal 14px sans-serif';
    mc.setFontSize(80 * rpx)
    mc.fillText("11", 30 * rpx, 145 * rpx)
    // 地区
    mc.setFillStyle('#CBAA8F')
    mc.setFontSize(18 * rpx)
    var district = "金水区";
    var districtLength = district.length - 3
    mc.fillText(district, (286 - (16 * districtLength)) * rpx, 85 * rpx)
    // 星期
    mc.setFillStyle('#CBAA8F')
    mc.setFontSize(18 * rpx)
    var week_str = "星期三";
    mc.fillText(week_str, 286 * rpx, 115 * rpx)
    // 天气
    mc.setFillStyle('#CBAA8F')
    mc.setFontSize(18 * rpx)
    var day_weather = "小雨";
    var max_degree = "19";
    var min_degree = "22";
    var weatherLength = day_weather.length + max_degree.length + min_degree.length - 3
    mc.fillText(day_weather + ' ' + min_degree + '~' + max_degree + '℃', (270 - (16 * weatherLength)) * rpx, 145 * rpx)
    // 下横线
    mc.beginPath()
    mc.setLineWidth(1)
    mc.moveTo(35 * rpx, 165 * rpx)
    mc.lineTo(115 * rpx, 165 * rpx)
    mc.setStrokeStyle('#CBAA8F')
    mc.stroke()
    // 背景
    mc.setFillStyle('#FCF3EB')
    mc.fillRect(35 * rpx, 215 * rpx, 303 * rpx, (130 + moreHeight) * rpx)
    // 文本
    var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];
    mc.font = 'normal 14px sans-serif';
    mc.setFontSize(14 * rpx)
    mc.setFillStyle("#666666")
    for (var a = 0; a < chr.length; a++) {
      if (mc.measureText(temp).width < 166 * rpx) {
        temp += chr[a];
      } else {
        a--; //这里添加了a-- 是为了防止字符丢失
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp); //如果数组长度大于2 则截取前两个 
    if (row.length > 1) {
      var rowCut = row.slice(0, 2);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (mc.measureText(test).width < 220) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
    }
    for (var b = 0; b < row.length; b++) {
      mc.fillText(row[b], 96 * rpx, 175 * 3 / 2 * rpx + b * 22);
    }
    //  小逗号
    var canvasImg = "/images/canvasImg.png";
    var canvasImg2 = "/images/canvasImg2.png";
    mc.drawImage(canvasImg, 50 * rpx, 232 * rpx, 11 * rpx, 15 * rpx)
    mc.drawImage(canvasImg, 65 * rpx, 232 * rpx, 11 * rpx, 15 * rpx)
    mc.drawImage(canvasImg2, 315 * rpx, (315 + moreHeight) * rpx, 11 * rpx, 15 * rpx)
    mc.drawImage(canvasImg2, 300 * rpx, (315 + moreHeight) * rpx, 11 * rpx, 15 * rpx)
    // 头像
    var ewm_width = 30 * rpx;
    var ewm_height = 30 * rpx;
    var ewm_x = 35 * rpx;
    var ewm_y = (385 + moreHeight) * rpx;
    mc.save();
    mc.beginPath(); //开始绘制
    mc.arc(ewm_width / 2 + ewm_x, ewm_height / 2 + ewm_y, ewm_width / 2, 0, Math.PI * 2, false);
    mc.fill();
    mc.clip();
    var headimgurl = "/images/default.png";
    mc.drawImage(headimgurl, ewm_x, ewm_y, ewm_width, ewm_height);
    mc.restore();
    // 名字
    mc.setFillStyle('#333333')
    mc.setFontSize(14 * rpx)
    var nickname = "你的名字";
    mc.fillText(nickname, 35 * rpx, (438 + moreHeight) * rpx)
    // 简介
    mc.setFillStyle('#999')
    mc.setFontSize(12 * rpx)
    mc.fillText("给你满满正能量", 35 * rpx, (463 + moreHeight) * rpx)
    // 二维码
    var qr_code = "/images/phone.png"
    mc.drawImage(qr_code, 275 * rpx, (385 + moreHeight) * rpx, 64 * rpx, 64 * rpx)
    // 二维码名称
    mc.setFillStyle('#333')
    mc.setFontSize(12 * rpx)
    var app_name = "希望帮到你";
    var app_nameLength = app_name.length - 1
    mc.fillText(app_name, (300 - app_nameLength * 6) * rpx, (465 + moreHeight) * rpx)
    mc.draw()
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'my-canvas',
        fileType: 'jpg',
        success: function (res) {
          console.log(res.tempFilePath);
          that.setData({
            imgCanvas: res.tempFilePath,
            canvasHide: true
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 500);
  },
  canvas: function () {
    wx.canvasToTempFilePath({
      canvasId: 'my-canvas',
      fileType: 'png',
      success(res) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({
                  title: 'OK',
                })
              }
            })
          }
        })
      }
    }, this)
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