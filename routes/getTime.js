const moment = require('moment')

function route() {
	return { time: moment().format('Do MMMM YYYY, h:mm:ss a') }
}

module.exports = route
