const simpleLambdaHandler = require('./utils/simpleLambdaHandler')
const getJSFromS3 = require('./utils/getJSFromS3')

async function getTime(event, context, callback) {
	const routes = await getJSFromS3(process.env.BUCKET_NAME, 'index.js')
	const simpleHttpHandler = routes.getTime
	return simpleLambdaHandler(simpleHttpHandler, event, context, callback)
}

module.exports = { getTime }
