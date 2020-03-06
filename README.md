# AWS Lambda Hot Deploy POC

## Description

This is a proof-of-concept for packaging a set of AWS Lambda services using Parcel JS which are reloaded at runtime.

## Introduction

Redeploying AWS Lambda instances or Google Firebase Functions is a slow process.

In the grand scheme of things, redeploying a typical set of services probably takes less than five minutes, so it's not a big deal. Of course, our testing is so excellent that we don't even need to deploy it more than once, knowing full well that it is perfect and needs no further changes whatsoever. But when we just want to redeploy something quickly without waiting for some continuous deployment process to pick it up and re-instantiate all those "serverless" servers so that we just fix that one little typo to give ourselves one small piece of joy from confirming that we've actually made something that finally works this time… those minutes are long

The excellent Parcel bundler offers the ability to bundle a package of code (including dependencies) to run in a Node environment (--target node). So I wanted to try deploying a Node "bundle" to an S3 bucket (which is quick) and allow my deployed Lambda/Firebase instances to pick it up.

This probably isn't something you want to use in a production environment, as it will add to your request/response and cold-startup time (although a lot of this could probably be mitigated into insignificance) and it relies on one big eval() statement in there somewhere, which is generally considered dodgy.

But it does work. Full article: https://medium.com/@jamesjessian/faster-deployment-aws-lambda-hot-deploy-with-parcel-51e2f378b8de

## Build

```
npm run build
```

Uses Parcel (https://parceljs.org/) to package all of our services (routes/index.js) into one bundle (dist/index.js).

## Deploy

```
npm run deploy
```

Deploys all services as AWS Lambda instances and all API endpoints to AWS API Gateway, using the Serverless Framework.

```
npm run deploy:hot
```

Deploys routes/index.js as a packaged bundle to our S3 bucket, which will get picked up by our deployed Lambda instances.
