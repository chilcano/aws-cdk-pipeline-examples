# Welcome to your CDK TypeScript project!


## ref: 
- https://cdkworkshop.com/20-typescript/70-advanced-topics/200-pipelines/1000-setting-up.html
- https://kzn.io/blog/2020/08/28/cdkpipeline_and_aws_lambda_nodejs_features/


```sh

cdk init --language=typescript

npm i -S @aws-cdk/pipelines @aws-cdk/aws-codepipeline @aws-cdk/aws-codepipeline-actions @aws-cdk/aws-codebuild @aws-cdk/aws-codedeploy @aws-cdk/aws-iam

npm install @aws-cdk/aws-lambda-nodejs
npm install -D bcrypt @types/bcrypt

npm i -S @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/aws-cloudfront 

// special bootstrap - gives perms to cdk pipeline to deploy on aws
cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess

// if error:
// Environment aws://630895193694/eu-west-2 failed bootstrapping: Error: The stack named CDKToolkit failed creation, 
// it may need to be manually deleted from the AWS console: ROLLBACK_COMPLETE
// The stack named CDKToolkit failed creation, it may need to be manually deleted from the AWS console: ROLLBACK_COMPLETE
// 1) remove CKDToolkit in CloudFormation
// 2) remove the S3 bucket cdk-xxxx-assets-accountid-region



```

