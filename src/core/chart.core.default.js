var Chart = require('./chart.core.js')

module.exports = {
  _set (scope, config) {
    if (!this[scope]) {
      this[scope] = {}
    }
   Chart.helper.configMerge(this[scope], config)
  }
}
