# CDK TypeScript Pipeline for HelloLambda

## Steps

### 1. Initialize your CDK project

```sh
$ mkdir hello-lambda-ts
$ cd hello-lambda-ts
$ cdk init --language typescript

## if package.jon is populated
$ npm install

## if no packages have been installed and package.json is empty
$ npm install @aws-cdk/aws-codedeploy @aws-cdk/aws-lambda @aws-cdk/aws-codebuild @aws-cdk/aws-codepipeline
$ npm install @aws-cdk/aws-codecommit @aws-cdk/aws-codepipeline-actions

## remove test dir, some of the code in the tests will cause errors because of other changes we'll be making
$ rm -rf test
```