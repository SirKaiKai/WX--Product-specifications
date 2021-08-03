var barcode = require('./barcode');
var qrcode = require('./qrcode');

function convert_length(length) {
	return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
  console.log(1)
}

function barc(id, code, width, height) {
	barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
  console.log(2)
}
 
function qrc(id, code, width, height) {
	qrcode.api.draw(code, {
		ctx: wx.createCanvasContext(id),
		width: convert_length(width),
		height: convert_length(height)
	})
  console.log(3)
}

module.exports = {
	barcode: barc,
	qrcode: qrc
}