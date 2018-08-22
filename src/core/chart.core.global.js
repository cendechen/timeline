var Chart = require('./chart.core.js')
var globalOptions = require('./chart.core.default.js')

Chart.globals = globalOptions._set('global', {
  data: {
    type: 'timeline',
    defaultDateDays: 0, // 默认选中的天数
    range: []
    // 默认刻度的现实尺寸
  },
  options: {
    width: '100%',
    height: 100
  },
  aixs: {
    ticksInterval: 10,    // 默认大小刻度之间间隔5个
    maxTickHeight: 20,    // 大刻度默认高度
    minTickHeight: 10,    // 小刻度默认高度
    ticksSpace: 10,       //
    ticksEnableColor: '#10BD4D',  // 刻度的可选择的颜色
    ticksDisableColor: '#ccc',    // 刻度的不可选择的颜色
    ticksAixsWidth: 1,            // 轴的默认宽度
    ticksDangerColor: 'red',      // 刻度的额度紧张的颜色
    ticksValueSpace: 5,           // 刻度到刻度值之间的距离
    ticksValueColor: '#10BD4D',   // 刻度对应的值可选择
    ticksValueDisableColor: '#ccc', // 刻度不可选择的值
    ticksValueDangerColor: 'red',   // 刻度不可选择的颜色值
    ticksValueFont: '12px 微软雅黑', // 刻度默认的字体大小和
    ticksValueTextAlign: 'center',  // 字体默认的对齐方式
    overDistance: 100, // 默认可以多拖动一份
    timer: 200, // 拖动结束后的滚动距离
    overDateColor: '#e9e9e9',
    overDateBaseLine: 5, // 基线离地部分5像素
    overDateTextAlign: 'start', // 文字对齐方式
    overDateFont: '20px'
  },
  indicator: { // 指示器的颜色值
    lineWidth: 1, // 指示器的线宽度
    lineColor: '#FF7500', // 指示器的颜色值
    lineCap: 'square',  // 线的结尾处
    lineJoin: 'round',   // 线的连接处的默认值
    tickWidth: 5, // 刻度宽度
    strokeStyle: '#ff7500' // 指示器的线条颜色
  }
})

