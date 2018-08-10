var Chart = require('./chart.core.js')
var helper = require('../utils//index.js')

var element = function (chart) {
  this.construct(chart)
}

/**
 * 扩展原型
 */
helper.extend(element.prototype, {
  construct (chart) {
    this.chart = chart
    this.initlizaion()
  },
  // 更新配置文件
  update (chart) {
    this.chart = chart
    this.initlizaion()
  }
})


element.extend = helper.inherits

module.exports = element
