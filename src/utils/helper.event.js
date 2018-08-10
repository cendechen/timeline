var helper = {
  createCanvas (width = 0, height = 0) {
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  },
  $ (selector) {
    return document.querySelector(selector)
  },
  on (dom, event, fn, flag = false) {
    dom.addEventListener(event, fn, flag)
  },
  off (dom, event, fn, flag = false) {
    dom.removeEventListener(event, fn, flag)
  },
  //  验证是否支持触摸事件
  isSupportTouch () {
    return ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;
  }
}
module.exports = helper
