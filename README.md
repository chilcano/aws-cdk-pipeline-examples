
# Lambda Pipeline in Python


## Steps

### 1. Ini your cdk python project

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


