const parse = require('try-json')

const httpResponses = require('./httpResponses')

async function simpleLambdaHandler(simpleHttpHandler, event, context, callback) {
	const body = parse(event.body) || {}
	const { pathParameters } = event
	try {
		// Call the route function we've been given, passing it the body and pathParameters from the request
		const response = await simpleHttpHandler(body, pathParameters)
		if (response.data && response.mimeType) {
			callback(null, httpResponses.binarySuccess(response.data, response.mimeType))
		} else {
			callback(null, httpResponses.success(response, 'application/json'))
		}
	} catch (err) {
		console.error('Error: ', err)
		callback(null, httpResponses.error(err))
	}
}

module.exports = simpleLambdaHandler
