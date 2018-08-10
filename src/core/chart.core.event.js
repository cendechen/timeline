var Helper = require('../utils/index.js')
var d3timer = require('d3-timer')
var d3ease = require('d3-ease')
var ease = d3ease.easeQuadInOut
let MouseType = {
  touchStart: 'touchstart',
  touchMove: 'touchmove',
  touchEnd: 'touchend'
}
if (!Helper.event.isSupportTouch()) {
  MouseType = {
    touchStart: 'mousedown',
    touchMove: 'mousemove',
    touchEnd: 'mouseup'
  }
}
module.exports = function (me) {
  var target = {
    isTouch: false,
    touchDistance: 0,
    touchX: 0,
    datetime: 0, // 开始时间
    duration: 0,
    realDistance: 0, // 真是的拖动距离
    points: [],
    leftDistance: 0, // 向左滑动的最大距离
    rightDistance: 0, // 向右滑动的最大距离
    index: -1 // 记录选中的ticks
  }

  var overDistance = me.Config.aixs.overDistance
  var halfDateDistance = me.data.axisLength / 2
  var halfWidth = me.Config.options.width / 2
  var defaultSelectDistance = (me.data.defaultDateDays - 1) * me.Config.aixs.ticksInterval

  // 设置默认的default拖动距离
  target.realDistance = -defaultSelectDistance
  target.touchDistance = -defaultSelectDistance

  target.rightDistance = overDistance
  target.leftDistance = -me.data.axisLength - overDistance
  me.eventTarget = target
  Helper.event.on(me.canvas, MouseType.touchStart, start)
  Helper.event.on(me.canvas, MouseType.touchMove, move)
  Helper.event.on(me.canvas, MouseType.touchEnd, end)
  updateRender()

  function start(e) {
    target.isTouch = true
    if (Helper.event.isSupportTouch()) {
      target.touchX = e.changedTouches[0].pageX
    } else {
      target.touchX = e.pageX
    }
    target.datetime = Date.now()
  }
  function move(e) {
    e.preventDefault()
    if (!target.isTouch) {
      return
    }
    var touchX = 0
    if (Helper.event.isSupportTouch()) {
      touchX = e.changedTouches[0].pageX
    } else {
      touchX = e.pageX
    }
    var dis = touchX - target.touchX
    target.realDistance += dis
    target.touchX = touchX
    // 向右滑动
    if ( target.realDistance >= target.leftDistance && target.realDistance <= target.rightDistance){
      target.touchDistance = target.realDistance
      if (target.points.length > 40) {
        target.points.shift()
      }
      target.points.push({time: Date.now(), dis: target.touchDistance})
    } else {
      target.realDistance = target.touchDistance
    }
    updateRender()
  }
  /**
   * 触摸结束事件
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  function end(e) {
    target.isTouch = false
    var end = Date.now()
    target.duration = end - target.datetime // 触摸的周期
    var len = target.points.length
    if (target.duration < 300 && len > 0) {
      // 有惯性运动
      var endPos = target.points[len - 1]
      var startPos = endPos
      for (var i = len - 1; i > 0 && target.datetime - target.points[i].time < 100 ; i--) {
        startPos = target.points[i] // 开始滑动出去100ms的起始点
      }
      if (startPos !== endPos) {  // 如果起始点不等于结束点
        var t = startPos.time - endPos.time
        var s = startPos.dis - endPos.dis
        var v = s / t
        var ds = v * 100 // 惯性运动的距离
        var dist = Math.max(Math.min(ds + target.realDistance, target.rightDistance), target.leftDistance)
        var changeDistance = dist - target.realDistance
        var beginRealDistance = target.realDistance
        target.timer = d3timer.timer((elapsed) => {
          var t = elapsed / me.Config.aixs.timer
          target.realDistance = changeDistance * ease(t) + beginRealDistance
          if (elapsed > me.Config.aixs.timer) {
            target.timer.stop()
          }
          updateRender()
        })
      } else {
        updateRender()
      }
    }
    updateRender()
  }
  /**
   * 获取选择的index值
   * @return {[type]} [description]
   */
  function getIndex () {
    // 获取值
    var i = -Math.floor(target.touchDistance / me.Config.aixs.ticksInterval)
    if (i > me.data.range.length - 1) {
      return me.data.range.length - 1
    }
    if (i < 0) {
      return 0
    }
    return i
  }
  function updateRender () {
    target.touchDistance = Math.floor(target.realDistance / me.Config.aixs.ticksInterval) * me.Config.aixs.ticksInterval
    const index = getIndex()
    if (target.index !== index) {
      target.index = index
      me.data.onSelect(index, me.data.range[index])
    }
    // 执行用户回调
    me.update()
  }
  return target
}

