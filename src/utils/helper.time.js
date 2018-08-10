var helper = {
  // 时间格式化，保证日月都是2位数
  numberFormat (val) {
    if (val.toString().length === 1) {
      return `0${val}`
    }
    return val
  },
  // 返回对应的日期和数据
  getDate (i) {
    var now = Date.now()
    var onedaySeconds = 60 * 60 * 24 * 1000
    var date = new Date
    date.setTime(onedaySeconds * i + now)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var days = date.getDate() + 1
    return {
      date: `${year}-${helper.numberFormat(month)}-${helper.numberFormat(days)}`,
      showDate: `${helper.numberFormat(month)}.${helper.numberFormat(days)}`,
      index: i
    }
  },
  formatNormal (date) { // 格式化字符串
    var reg = /^(\d{4})(\d{2})(\d{2})$/
    return date.replace(reg, "$1-$2-$3")
  },
  formatAll (date) {
    const dates = date.split('-')
    return `${dates[1]}.${dates[2]}`
  }
}


module.exports = helper
