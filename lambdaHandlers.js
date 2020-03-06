const simpleLambdaHandler = require('./utils/simpleLambdaHandler')
const routes = require('./routes')

async function getTime(event, context, callback) {
	const simpleHttpHandler = routes.getTime
	return simpleLambdaHandler(simpleHttpHandler, event, context, callback)
}

module.exports = { getTime }
