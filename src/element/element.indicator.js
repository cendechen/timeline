var element = require('../core/chart.core.element.js')

module.exports = element.extend({
  initlizaion () {
    var me = this
    me.ctx = me.chart.ctx
    me.Config = me.chart.Config
  },
  drawTick () {
    var me = this
    me.ctx.save()
    me.ctx.lineCap = me.Config.indicator.lineCap
    me.ctx.lineWidth = me.Config.indicator.lineWidth
    me.ctx.strokeStyle = me.Config.indicator.strokeStyle
    var x = me.Config.options.width / 2
    var y = me.Config.options.height
    me.ctx.beginPath()
    me.ctx.moveTo(x - me.Config.indicator.tickWidth, 0)
    me.ctx.lineTo(x + me.Config.indicator.tickWidth, 0)
    me.ctx.moveTo(x, 0)
    me.ctx.lineTo(x, y)
    me.ctx.moveTo(x - me.Config.indicator.tickWidth, y)
    me.ctx.lineTo(x + me.Config.indicator.tickWidth, y)
    me.ctx.stroke()
  },
  draw (){
    this.drawTick()
  }
})
