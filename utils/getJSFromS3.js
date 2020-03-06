require('aws-sdk/global')
const S3 = require('aws-sdk/clients/s3')
const nodeEval = require('node-eval')

const s3 = new S3()

const cache = {}
const cacheTimes = {}

async function getJSFromS3(bucketName, sourceFilename) {
	const s3Params = {
		Bucket: bucketName,
		Key: sourceFilename,
	}

	// Check cache
	const cacheKey = bucketName + '/' + sourceFilename
	const head = await s3.headObject(s3Params).promise()
	if (cache[cacheKey] && cacheTimes[cacheKey] >= head.LastModified) return cache[cacheKey]

	// Get JavaScript file from S3 and eval it
	const data = await s3.getObject(s3Params).promise()
	const jsSource = data.Body.toString('utf8')
	const result = nodeEval(jsSource, './' + sourceFilename)

	// Simple caching by LastModified date
	cache[cacheKey] = result
	cacheTimes[cacheKey] = head.LastModified

	return result
}

module.exports = getJSFromS3
