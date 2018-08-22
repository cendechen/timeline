var element = require('../core/chart.core.element.js')
var helper = require('../utils/index.js')

module.exports = element.extend({
  initlizaion () {
    var me = this
    me.ticks = me.chart.data // 保存数据
    me.Config = me.chart.Config
    me.ctx = me.chart.ctx
    // 选中天数
  },
  getDistance () {
    // 返回前段距离
    var me = this
    var x = me.Config.options.width / 2 // 终点处默认为0 刻度
    // 鼠标拖动的距离
    if (me.chart.eventTarget && me.chart.eventTarget.touchDistance) {
      x += me.chart.eventTarget.touchDistance // 拖动了距离
    }
    return x
  },
  drawShape () {
    var me = this
    me.ctx.fillStyle = 'rgba(16, 189, 77, 0.2)'
    me.ctx.fillRect(0, 0, me.Config.options.width, me.Config.options.height)
  },
  drawChartAixs () {
    var me = this
    var x = this.getDistance() // 获取滑动位置
    me.ctx.save()
    me.ctx.strokeStyle = me.Config.aixs.ticksEnableColor
    me.ctx.lineWidth = me.Config.aixs.ticksAixsWidth
    me.ctx.moveTo(x, me.Config.options.height - 1)
    me.ctx.lineTo(x + me.ticks.axisLength, me.Config.options.height - 1)
    me.ctx.stroke()
  },
  drawChartAixsTicks () {
    var me = this
    var ctx = me.ctx
    var touchDistance = this.getDistance()
    helper.each(me.ticks.range, (d, i) => { // 绘制每一个刻度
      ctx.save()
      // 开始绘制轴
      me.getTicksColor(d, ctx)
      // 设置绘制颜色
      var x = touchDistance + i * me.Config.aixs.ticksInterval
      // 移动到绘制点
      ctx.moveTo(x, me.Config.options.height)
      // 刻度是否为主刻度
      if (d.isMasterAxis) {
        // 长轴
        ctx.lineTo(x, me.Config.options.height - me.Config.aixs.maxTickHeight)
      } else {
        // 短轴
        ctx.lineTo(x, me.Config.options.height - me.Config.aixs.minTickHeight)
      }
      ctx.stroke()
      return true
    })
    helper.each(me.ticks.range, (d, i) => {
      ctx.save()
      me.getTicksColor(d, ctx) // 设置绘制颜色
      if (d.isMasterAxis) {
        var x = touchDistance + i * me.Config.aixs.ticksInterval
        var y = me.Config.options.height - me.Config.aixs.maxTickHeight - me.Config.aixs.ticksValueSpace
        ctx.textAlign = me.Config.aixs.ticksValueTextAlign
        ctx.fillText(me.ticks.tickFormat(d['ticks']), x, y)
      }
      return true
    })
  },
  getTicksColor (d, ctx) {
    var me = this
    if (!me.ticks.disable(d)) {
      // 是否可选
      ctx.strokeStyle = me.Config.aixs.ticksEnableColor
      ctx.fillStyle = me.Config.aixs.ticksEnableColor
    } else {
      ctx.strokeStyle = me.Config.aixs.ticksValueDisableColor
      ctx.fillStyle = me.Config.aixs.ticksValueDisableColor
    }
  },
  drawTickText () {
    // 最长存到
    var me = this
    const distance = this.getDistance() // 滑动的距离
    const x = distance + me.Config.aixs.ticksInterval * me.ticks.range.length + 10
    const data = me.ticks.range[me.ticks.range.length - 1]
    const showDate = me.ticks.tipsFormat(data)
    me.ctx.textAlign = me.Config.aixs.overDateTextAlign
    me.ctx.fillStyle = me.Config.aixs.overDateColor
    me.ctx.font = me.Config.aixs.overDateFont
    me.ctx.fillText(showDate, x, me.Config.options.height - me.Config.aixs.overDateBaseLine)
  },
  draw (){
  //  this.drawChartAixs()
   // this.drawShape()
    this.drawChartAixsTicks()
    this.drawTickText()
  }
})

