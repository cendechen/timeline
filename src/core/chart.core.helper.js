var helper = require('../utils/index.js')

helper.configMerge = function (target, orgin) {
  helper.merge(target, orgin) //复制代码
}
/**
 * 获取谋个值的大小
 * @param  {[type]} dom [description]
 * @param  {[type]} css [description]
 * @return {[type]}     [description]
 */
helper.getStyle = function(dom, css) {
  if (document.defaultView && document.defaultView.getComputedStyle) {
    var style = document.defaultView.getComputedStyle(dom, null)
  } else {
    var style = dom.currentStyle
  }
  return style[css]
}
/**
 * 获取实际高度
 * @param  {[type]} Chart [description]
 * @return {[type]}       [description]
 */
helper.getValue = function (value) {
  var reg = /(\-?\d+\.*\d*)/
  var match = value.match(reg)
  if (match) {
    return parseFloat(match[1])
  }
  return 0
}
module.exports = function Helper(Chart) {
  Chart.helper = helper
}
