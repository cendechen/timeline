# 时间轴组件

> 起步
```
import ceChart from 'ce-timelines'
import helper  from 'ce-timelines/src/utils/index.js'

var canvas = document.getElementById('canvas')
var rate = []

for(var i = 14; i <= 60; i++) {
  var datetime = helper.time.getDate(i)
  rate.push({
    ticks: datetime.date, // 日期
    days: i, // 第几天
  })
}
var chart = new Chart('#canvas', {
  options: {
    width: '100%',
    height: 90
  },
  data: {
    type: 'timeline',
    defaultDateDays: 7, //默认选择第三十天
    range: rate,
    onSelect (index, data) { // 选择回调
      //console.log(index, data)
    },
    tickFormat (v) {
      console.log(v)
      return v
    },
    disable (d) { // 判断是否有检查需要disable,渲染组件颜色
      return false
    }
  }
})

```

## 配置选项

```javascript
{
  data: {
    type: 'timeline',
    defaultDateDays: 0, // 默认选中的天数
    range: [] // 选择器的数据
  },
  options: {
    width: '100%', // canvas的默认宽度
    height: 100  // canvas的默认高度
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
    timer: 200 // 拖动结束后的滚动距离
  },
  indicator: { // 指示器的颜色值
    lineWidth: 1, // 指示器的线宽度
    lineColor: '#FF7500', // 指示器的颜色值
    lineCap: 'square',  // 线的结尾处
    lineJoin: 'round',   // 线的连接处的默认值
    tickWidth: 5, // 刻度宽度
    strokeStyle: '#ff7500' // 指示器的线条颜色
  }
}
```

## 回调函数
```
onSelect (index, data) { // 选中的数据行，回调函数的的参数是 index 数据项的index值，data是选中的数据

}
tickFormat (v) { // 设置刻度尺的显示的回调函数
  return v
}
disable (data) { // 是否禁用该选项，不让选择

}
```
## demo
![Image text](https://upload-images.jianshu.io/upload_images/10363634-40b393d210e86448.gif?imageMogr2/auto-orient/strip)
