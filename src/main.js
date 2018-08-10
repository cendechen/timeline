import Chart from './index.js'
import helper  from './utils/index.js'

var canvas = document.getElementById('canvass')
var rate = []

for(var i = 14; i <= 60; i++) {
  var datetime = helper.time.getDate(i)
  rate.push({
    ticks: datetime.date, // 日期
    days: i, // 天数
    rate: 4.45, // 现实日利率
    days_interest: 0.0032, // 天数对应利率收益
    usable_quota: 6e7, // 可用额度
  })
}
var chart = new Chart('#canvas', {
  options: {
    width: '100%',
    height: 90
  },
  aixs: {
    overDistance: 0
  },
  data: {
    type: 'timeline',
    defaultDateDays: 7, //默认选择第三十天
    range: rate, // 默认可以选择的数据
    onSelect (index, data) { // 选择回调
       console.log(index, data)
    },
    tickFormat (v) {
      return v.replace(/^(\d{4})\-(\d{2})\-(\d{2})$/, '$2.$3')
    },
    disable (d) { // 判断是否有检查需要disable,渲染组件颜色
      return false
    }
  }
})



