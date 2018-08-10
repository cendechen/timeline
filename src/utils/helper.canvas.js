
module.exports = {
  // 清理绘图区
  clear (ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
  },
  // 绘制刻度值
  ticks (chart, x, ticksSize = false) {
    let ctx = chart.ctx
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = chart.Config.global.ticksColor
    ctx.lineWidth = 1
    ctx.moveTo(x, chart.height)
    if (ticksSize) {
      ctx.lineTo(x, chart.height - chart.Config.global.largeTickHeight)
    } else {
      ctx.lineTo(x, chart.height - chart.Config.global.smallTickHeight)
    }
    ctx.stroke()
  },
  // 绘制刻度值
  ticksValue (chart, x, val) {
    let ctx = chart.ctx
    ctx.save()
    ctx.moveTo(x, chart.height - chart.Config.global.largeTickHeight)
    ctx.font = chart.Config.global.ticksValueFont
    ctx.fillStyle = "#10BD4D"
    ctx.textAlign = 'center'
    ctx.fillText(val, x, chart.height - chart.Config.global.largeTickHeight - chart.Config.global.ticksValueSpace)
  },
  indicator (chart, x) {
    let ctx = chart.ctx
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x - 5, chart.height - 1)
    ctx.strokeStyle = '#FF7500'
    ctx.lineTo(x + 5, chart.height - 1)
    ctx.moveTo(x, chart.height - 1)
    ctx.lineTo(x, 1)
    ctx.moveTo(x - 5, 1)
    ctx.lineTo(x + 5, 1)
    ctx.stroke()
  },
  gradient (chart) {
    let ctx = chart.ctx
    ctx.save()
    let gradient = ctx.createLinearGradient(0, 0, chart.width, 0)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(0.5, 'rgba(16, 189, 77, 255)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.rect(0, 0, chart.width, chart.height)
    ctx.fill()
  }
}
