# CDK TypeScript Pipeline for HelloLambda

## Ref
- https://docs.aws.amazon.com/cdk/latest/guide/codepipeline_example.html

## Steps

### 1. Initialize your CDK project

```sh
$ mkdir hello-lambda-ts
$ cd hello-lambda-ts
$ cdk init --language typescript

## if package.jon is already populated
$ npm install

## if no packages have been installed and package.json is empty
$ npm install @aws-cdk/aws-codedeploy @aws-cdk/aws-lambda @aws-cdk/aws-codebuild @aws-cdk/aws-codepipeline install @aws-cdk/aws-codecommit @aws-cdk/aws-codepipeline-actions

## remove test dir, some of the code in the tests will cause errors because of other changes we'll be making
$ rm -rf test
```

### 2. Code

#### Step 1. Code the Lambda

> Place your AWS Lambda function in the new directory. Our CDK app expects a Lambda function written in `TypeScript`, with a 
> main file of index.ts and a main function named `main()`, regardless of what language the rest of the app is written in.

```sh
$ mkdir hello_lambda
$ touch hello_lambda/index.ts
```

#### Step 2. Define the Lambda stack

> To deploy the Lambda function we have to create a stack in `<root>/lib/<your-stack>.ts` that we'll deploy in our pipeline.
> The code in the lambda stack will be built by the pipeline, and the pipeline passes us a ref to it as AWS Cfn param. We get 
> it using the `fromCfnParameters()` method and store it as an attribute named `lambdaCode`, where it can be picked up by the 
> deployment stage of the pipeline.

> This code also uses the CodeDeploy support for blue-green deployments to Lambda, transferring traffic to the new version in 
> 10-percent increments every minute. As blue-green deployment can only operate on aliases, not on the function directly, we 
> create an alias for our function, named `Prod`.

> The alias uses a Lambda version obtained using the function's `currentVersion` property. This ensures that every invocation 
> of the AWS CDK code publishes a new version of the function.


__If the Lambda function needs any other resources when executing, such as an `Amazon S3` bucket, `Amazon DynamoDB` table, or `Amazon API Gateway`, you'd declare those resources here.__


> After running `cdk init --language typescript`, CDK created `hello-lambda-ts-stack.ts` for us. We only need to update it.


#### Step 3. Define the Pipeline stack

Our second stack, PipelineStack, contains the code that defines our pipeline.

First it needs a reference to the Lambda code it's deploying. For that, we define a new props interface for it, `PipelineStackProps`. 
This extends the standard StackProps and is how clients of this class (including ourselves) pass the Lambda code that the class needs.

The source code repo (GitHub, CodeCommit, etc.) is also passed in the `PipelineStackProps`.

The pipeline has two CodeBuild projects. The __first one__ synthesizes the CloudFormation template to deploy the Lambda function from the 
AWS CDK code. To do that, it installs the AWS CDK Toolkit using `npm`, then any dependencies, and then issues `cdk synth` command to 
produce CloudFormation templates in the target directory `dist`. The `dist/HelloLambdaStack.template.json` file is this step's output.

The __second one__ builds the Lambda code. It changes to `hello_lambda`, which is where the Lambda code lives. It then installs any 
dependencies and the TypeScript compiler, then builds the code. The output is the contents of the `node_modules` directory, plus the 
`index.js` file. The Lambda runtime will call the `handler()` function in this file to handle requests.

__This is where you'll need some changes if you use a Lambda function written in a language other than TypeScript.__


```sh
$ touch lib/pipeline-stack.ts
``` 

Noew, edit it.

### Step 4. Main program

The `bin/hello-lambda-ts.ts` that `cdk init` created it, now should firstly instantiates the `HelloLambdaTsStack` class as 
`HelloLambdaStack`, which is what the AWS CDK build in the pipeline expects. Then it instantiates the `PipelineStack` class, 
passing the Lambda code from the `HelloLambdaStack` object.


### Step 5. Deploying the pipeline



```sh
# push the changes
git add --all
git commit -m "add CDK app"
git push
``` 

```sh
# configure your AWS account
git add --all
git commit -m "add CDK app"
git push
``` 

```sh
# deploy the pipeline

cdk deploy PipelineDeployingLambdaStack
``` 