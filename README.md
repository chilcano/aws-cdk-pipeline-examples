
# Hello Lambda CodePipeline in CDK Python

## Steps

### 1. Initialize your cdk python project

```sh
$ mkdir lambda-py; cd lambda-py
$ cdk init --language=python

$ deactivate

$ python3 -m venv .venv

$ source .venv/bin/activate

# only when cdk project is created
$ pip install aws-cdk.core aws-cdk.pipelines aws-cdk.aws-codepipeline aws-cdk.aws-codepipeline-actions aws-cdk.aws-codedeploy aws-cdk.aws-apigateway aws-cdk.aws-lambda pytest requests pylint
$ pip freeze > requirements.txt

# only if you have populate this file
$ pip install -r requirements.txt
```

### 2. Write your code

```
$ code .
```

### 3. Configure your AWS account

```sh
export AWS_ACCESS_KEY_ID="AKIA...."
export AWS_SECRET_ACCESS_KEY="AvO..."
export AWS_DEFAULT_REGION="eu-west-2"
``` 

### 4. Deploy the CDK project

```
$ cdk synth

// forces bootstrap
$ cdk bootstrap -f

// are the same, this creates a cdktoolkit s3 bucket using you accountid and region
$ cdk bootstrap aws://630895193694/eu-west-2
$ cdk bootstrap aws://unknown-account/unknown-region
$ cdk bootstrap --cloudformation-execution-policies arn:aws:iam:aws:policy/AdministratorAccess

// create your repo
$ hub create -d "Initializing MTLS Authn for Microservices" chilcano/pipeline-mtls-authn

$ git remote add origin https://github.com/chilcano/pipeline-mtls-authn.git
$ git branch -M main

// push your changes
$ git add . && git commit -m "1st commit" && git push -uf origin main
```

### 5. Testing

Go to `AWS Console > CloudFormation > Stacks` and there you will see the Cfn Stack the PipelineStack created. In my case is `Pre-Prod-HelloLambdaWebservice`, once selected get the output variables, specifically the `HelloLambdaUrl` to call to HelloLambda. 

```sh
$ aws cloudformation list-stacks --query "StackSummaries[][StackName]" --stack-status-filter CREATE_COMPLETE --output text | grep Hello
Pre-Prod-HelloLambdaWebservice

$ aws cloudformation describe-stacks --stack-name "Pre-Prod-HelloLambdaWebservice" --query "Stacks[].Outputs[]"
[
    {
        "OutputKey": "APIGatewayHelloLambdaWebserviceEndpoint285E8ACD",
        "OutputValue": "https://wwxp6lbr36.execute-api.eu-west-2.amazonaws.com/prod/"
    },
    {
        "OutputKey": "HelloLambdaUrl",
        "OutputValue": "https://wwxp6lbr36.execute-api.eu-west-2.amazonaws.com/prod/"
    }
]

$ curl -sSL -D - https://wwxp6lbr36.execute-api.eu-west-2.amazonaws.com/prod/

HTTP/2 200 
content-type: application/json
content-length: 20
date: Mon, 08 Feb 2021 18:30:38 GMT
x-amzn-requestid: 529b8e36-b6d3-493a-8bd0-bbba5aa50738
x-amz-apigw-id: acF0SF9DrPEFhjw=
x-amzn-trace-id: Root=1-6021834e-5b049a0f230aaffd75d01558;Sampled=0
x-cache: Miss from cloudfront
via: 1.1 3a040ac81c3e03a31883d4bf85a17866.cloudfront.net (CloudFront)
x-amz-cf-pop: MAD51-C2
x-amz-cf-id: yHkZAdVSN8sJKw3h4Qr1dTEn2qhK05SosQUlqwzHPmH-n97Fu0vdiQ==

Hello from Lambda!!!
```

### 6. Clean up

The next command will remove the Pipeline Stack (CloudFormation) and its corresponding CodePipeline, It will not remove the CloudFormation Stack (`Pre-Prod-HelloLambdaWebservice`) created for It, S3 buckets created during the CodePipeline Build stage, API Gateway endpoints, IAM Roles, etc. You have to do manually or implement a procedure to delete them.
```sh
$ cdk destroy
```
