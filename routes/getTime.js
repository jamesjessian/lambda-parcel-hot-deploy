const moment = require('moment')

function route() {
	return { time: moment().format('MMMM Do YYYY, h:mm:ss a') }
}

module.exports = route
