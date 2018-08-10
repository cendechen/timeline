var Chart = require('./chart.core.js')
var helper = require('../utils/index.js')
var Options = require('./chart.core.default.js')
var touchEvent = require('./chart.core.event.js')
// 初始化实例
Chart.Instances = {}
// 控制器对象保存
Chart.Controllers = {}

helper.extend(Chart.prototype, {
  // 初始化函数
  construct (canvas, config = {}) {
    var me = this
    me.time = Date.now() // 初始化的时间戳
    // 初始化环境
    if (typeof canvas === 'string') {
      var canvasContainer = canvas
      canvas = helper.event.createCanvas()
      helper.event.$(canvasContainer).appendChild(canvas)
    }
    // 设置图表的参数
    me.uid = helper.uid()
    me.canvas = canvas
    me.ctx = canvas.getContext('2d')
    // 合成参数数据
    console.log(Options.global)
    me.Config = helper.merge({}, Options.global, config)
    Chart.Instances[me.uid] = me
    // resize后的更新算法

    this.initialize()  // 初始化绘图
    this.bindEvent() // 时间监控
    this.update()  // 更新数据
  },
  // 更新画布
  update () {
    var me = this
    me.updateCanvas()
    me.draw()
  },
  // 绘图的初始化算法
  initialize () {
    var me = this
    var Config = me.Config
    me.updateCanvas()

    me.canvas.style.mask = 'linear-gradient(to right, rgba(0,0,0, 0) 20%, rgba(0,0,0,255) 50%, rgba(0,0,0,0) 80%)'
    me.canvas.style['-webkit-mask'] = 'linear-gradient(to right, rgba(0,0,0, 0) 20%, rgba(0,0,0,255) 50%, rgba(0,0,0,0) 80%)'
    // 初始化数据项
    me.data = Config.data
    me.getTicksMateData() // 设置坐标轴的数据
    // 初始化控制器
    me.controller = new Chart.Controllers[me.data['type']](me)
    me.draw()
  },
  draw () {
    var me = this
    me.controller.draw()
  },
  // 事件监听
  bindEvent () {
    touchEvent(this) // 处理事件绑定
  },
  // 更新canvas的宽度
  updateCanvas () {
    var me = this
    var Config = me.Config
    var canvas = me.canvas
    if (Config.options.width === '100%') {
      // 获取实际宽度
      var width = helper.getValue(helper.getStyle(canvas.parentNode, 'width'))
      Config.options.width = width
    }
    canvas.parentNode.style.fontSize = 0
    canvas.width = Config.options.width
    canvas.height = Config.options.height
  },
  // 处理每个刻度
  getTicksMateData () {
    var me = this
    // 对数组进行排序
    me.data['range'].sort((m, n)=> {
      return m.days - n.days // 排序字段
    })
    me.data.disable = me.data.disable || function (){return false} // 绘制数据
    me.data['range'].forEach((d, i) => {
      d.isMasterAxis = i % 5 === 0 // 标记主刻度
    })
    // 返回数据
    me.data['axisLength'] = (me.data['range'].length - 1) * me.Config.aixs.ticksInterval
    // 数据刻度的format
    console.log(me.data.tickFormat)
    me.data.tickFormat = me.data.tickFormat || function(v) {
      return v // 默认的tickFormat数据
    }
  }
})
