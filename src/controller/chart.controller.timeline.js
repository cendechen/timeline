var helpCanvas = require('../utils/helper.canvas.js')
var helper = require('../utils/index.js')
var ElementsAxis = require('../element/element.axis.js')
var ElementsIndicator = require('../element//element.indicator.js')
var Chart = require('../core/chart.core.js')

var timeline = function (chart) {
  this.chart = chart // 这个时间轴的数据
  this.buildOrUpdateElement()
}

Chart.Controllers['timeline'] = timeline

helper.extend(timeline.prototype, {
  buildOrUpdateElement () {
    var me = this
    if (this.elements) {
      this.elements.axis.update(me.chart)
      this.elements.indicator.update(me.chart)
    } else {
      this.elements = {
        axis: new ElementsAxis(me.chart),
        indicator: new ElementsIndicator(me.chart)
      }
    }
  },
  // 清空接口
  clear () {
    helpCanvas.clear(this.chart.ctx, this.chart.Config.options.width, this.chart.Config.options.height)
  },
  // 绘制刻度值
  drawTicks () {
    this.elements.axis.draw()
  },
  // 绘制指示器
  drawIndicator () {
    this.elements.indicator.draw()
  },
  // 公共的draw 方法
  draw () {
    this.clear()
    this.drawTicks()
    this.drawIndicator()
  },
  update (chart) {
    this.chart = chart
    this.buildOrUpdateElement()
    this.draw() // update接口
  }
})

