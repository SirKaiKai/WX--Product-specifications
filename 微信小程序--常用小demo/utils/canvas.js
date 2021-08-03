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
    //canvasId: 'posterCanvas', //之前的写法
    canvas: canvasObj, //现在的写法
    success: (res) => {
      console.log(res);
      // that.setData({ canClose: true });
      //保存图片
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          wx.showToast({
            title: '已保存到相册',
            icon: 'success',
            duration: 2000
          })
          // setTimeout(() => {
          //   that.setData({show: false})
          // }, 6000);
        },
        fail: function (err) {
          console.log(err);
          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            console.log("当初用户拒绝，再次发起授权")
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