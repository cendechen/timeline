var Chart = require('./core/chart.core.js')

require('./core/chart.core.helper.js')(Chart)
require('./core/chart.core.global.js')

require('./core/chart.core.controller.js')
require('./controller/chart.controller.timeline.js')

module.exports = Chart
