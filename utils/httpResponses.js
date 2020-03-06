/**
 * Base response HTTP headers
 */
const responseHeaders = mimeType => ({
	'Content-Type': mimeType,
	'Access-Control-Allow-Origin': '*', // Required for CORS support to work
	'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
})

/**
 * HTTP response templates
 */
const httpResponses = {
	binarySuccess: (data = {}, mimeType = 'application/json', code = 200, additionalRespHeaders = {}) => {
		return {
			statusCode: code,
			headers: [...responseHeaders(mimeType), ...additionalRespHeaders],
			body: data,
			isBase64Encoded: true,
		}
	},
	success: (data = {}, mimeType = 'application/json', code = 200, additionalRespHeaders = {}) => {
		return {
			statusCode: code,
			headers: { ...responseHeaders(mimeType), ...additionalRespHeaders },
			body: JSON.stringify(data),
		}
	},
	error: error => {
		return {
			statusCode: error.code || 500,
			headers: responseHeaders('application/json'),
			body: JSON.stringify(error),
		}
	},
}

module.exports = httpResponses
