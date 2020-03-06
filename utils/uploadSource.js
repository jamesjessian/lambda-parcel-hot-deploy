require('aws-sdk/global')
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const s3 = new S3()

async function uploadSourceToS3(bucketName, destPath, sourcePath) {
	const contents = fs.readFileSync(sourcePath)
	const data = Buffer.from(contents, 'binary')
	const s3Params = {
		Body: data,
		Bucket: bucketName,
		Key: destPath,
	}

	return s3.putObject(s3Params).promise()
}

// =================================================================================================

module.exports = uploadSourceToS3

// =================================================================================================

if (require.main === module) {
	// Get bucket name
	const deploymentDetails = fs.readFileSync('.build/stack.json', 'utf8')
	const deploymentDetailsObj = JSON.parse(deploymentDetails)

	uploadSourceToS3(deploymentDetailsObj.HotSourceBucketName, 'index.js', 'dist/index.js')
		.then(_ => console.log('Upload complete'))
		.catch(err => console.error(err))
}
