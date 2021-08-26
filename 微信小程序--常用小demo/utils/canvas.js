// 封装文字换行限制(ctx 文字内容，文字大小，颜色，文本宽度，显示行数，行间距，x轴位置，y轴位置)
function newline(ctx,newlineText, font, fillStyle, textWidth, lineNumber, spacing, xShaft, yShaft) {
  let chr = newlineText.split("");//将文本字符串分割为字符串数组
  let temp = "";
  let row = [];
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  for (let a = 0; a < chr.length; a++) {
    if (ctx.measureText(temp).width < textWidth) {
      temp += chr[a]
    } else {
      a--;//这里添加了a-- 是为了防止字符丢失
      row.push(temp);
      temp = "";
    }
  }
  row.push(temp);
  // 如果数组长度大于2 则截取前两个
  if (row.length > lineNumber) {
    let rowCut = row.slice(0, lineNumber);
    let rowPart = rowCut[lineNumber - 1];
    let test = "";
    let empty = [];
    for (let a = 0; a < rowPart.length; a++) {
      if (ctx.measureText(test).width < textWidth) {
        test += rowPart[a]
      } else {
        break
      }
    }
    empty.push(test);
    let group = empty[0] + "...";//这里设置显示行数，超出的用...显示
    rowCut.splice(-1, 1, group);
    row = rowCut;
  }
  for (let b = 0; b < row.length; b++) {
    ctx.fillText(row[b], xShaft, yShaft + b * spacing, textWidth)
  }
}
//实心矩形带圆角ctx x轴 y轴 宽度 高度 圆角半径 背景色
function roundRectColor(ctx,x, y, w, h, r, color) {
  ctx.beginPath();
  ctx.save();
  ctx.fillStyle = color;
  // 绘制左上角圆弧
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  // 绘制border-top
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  // 绘制右上角圆弧
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  // 绘制border-right
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  // 绘制右下角圆弧
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  // 绘制border-bottom
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  // 绘制左下角圆弧
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  // 绘制border-left
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)
  ctx.fill()
  ctx.closePath()
  ctx.clip()
  ctx.restore()
}
// 绘制图片canvas,ctx 路径 x轴 y轴 宽度 高度 圆角  
async function imgs(canvas,ctx,imgSrc,imgX,imgY,imgW,imgH,imgR){
  const bgImg = canvas.createImage();
  bgImg.src = imgSrc;
  let bgImgPo = await new Promise((resolve, reject) => {
    bgImg.onload = () => {
      resolve(bgImg)
    }
    bgImg.onerror = (e) => {
      reject(e)
    }
  });
  ctx.save()
  ctx.beginPath()
  // 圆角
  ctx.arc(imgX + imgR, imgY + imgR, imgR, Math.PI, Math.PI * 1.5)
  ctx.arc(imgX + imgW - imgR, imgY + imgR, imgR, Math.PI * 1.5, Math.PI * 2)
  ctx.arc(imgX + imgW - imgR, imgY + imgH - imgR, imgR, 0, Math.PI * 0.5)
  ctx.arc(imgX + imgR, imgY + imgH - imgR, imgR, Math.PI * 0.5, Math.PI)
  ctx.clip()
  ctx.drawImage(bgImg, imgX, imgY, imgW, imgH)
  // 圆
  // ctx.arc(imgX + (imgW / 2), imgY + (imgW / 2), (imgW / 2), 0, 2 * Math.PI, false)//画一个圆形裁剪区域,以圆心为初始
    // ctx.clip()//裁剪
    // ctx.drawImage(bgImg, imgX, imgY, imgW, imgW);
    // ctx.closePath();
  ctx.restore()
}
// 文字ctx 文本内容 大小 颜色 x轴 y轴 当前canvas宽度 居中属性 （后两个属性可不写）
function text(ctx, textCont, size, color, textX, textY, width,center){
  ctx.fillStyle = color;
  ctx.font = size;
  if(center = center){
    ctx.fillText(textCont, (width - ctx.measureText(textCont).width) * 0.5, textY);
  }else{
    ctx.fillText(textCont, textX, textY);
  }
  
}
// 保存
async function saveImg(canvasId) {
  let that = this;
  // 现在的写法
  const query = wx.createSelectorQuery();
  const canvasObj = await new Promise((resolve, reject) => {
    query.select(canvasId)
      .fields({ node: true, size: true })
      .exec(async (res) => {
        resolve(res[0].node);
      })
  });
  wx.canvasToTempFilePath({
    //fileType: 'jpg',
    //canvasId: canvasId, //之前的写法
    canvas: canvasObj, //现在的写法
    success: (res) => {
      //保存图片
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          wx.showToast({
            title: '已保存到相册',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            console.log("当用户拒绝，再次发起授权")
            wx.showModal({
              title:"提示",
              content:"您还没有授权使用相册，请前往设置",
              success (res) {
                if (res.confirm) {
                  wx.getSetting({
                    success(res){
                      console.log(res,'授权')
                      if(!res.authSetting['scope.writePhotosAlbum']){
                        console.log('拉取授权')
                        wx.openSetting({
                          success(res){
                            console.log(res.authSetting,'设置页')
                          }
                        })
                      }
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            util.showToast("请截屏保存分享");
          }
        },
        complete(res) {
          wx.hideLoading();
          console.log(res);
        }
      })
    },
    fail(res) {
      console.log(res);
    }
  }, this)
}
   

// 暴露接口
module.exports={
  newline: newline,
  roundRectColor: roundRectColor,
  imgs:imgs,
  text: text,
  saveImg: saveImg
}



// 基础用法
/*let that = this;
let carvasW = that.data.carvasW;
let carvasH = that.data.carvasH;
let rpx;
wx.getSystemInfo({
  success: function (res) {
    rpx = res.windowWidth / 375
    that.setData({
      carvasW:carvasW*rpx,
      carvasH:carvasH*rpx,
    })
  },
})
const query = wx.createSelectorQuery();
query.select("#myCanvas").fields({node:true,size:true}).exec(async(res)=>{
  const canvas = res[0].node
  const ctx = canvas.getContext("2d")
  canvas.width = that.data.carvasW;
  canvas.height = that.data.carvasH;
  // 背景色
  canvasJs.roundRectColor(ctx,0, 0, carvasW * rpx, carvasH * rpx,0,'#fff')
  // 礼品卡图
  let carImg = '/images/default.png';
  await canvasJs.imgs(canvas,ctx,carImg,15*rpx,15*rpx,345*rpx,195*rpx,8*rpx)
})*/