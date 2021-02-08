
# DevOps Playground - Mutual TLS Authn for Microservices


## Steps

```
$ mkdir pipeline-mtls-authn; cd pipeline-mtls-authn
$ cdk init --language=python

// if you come from other python project
$ deactivate

$ python3 -m venv .venv

$ source .venv/bin/activate

$ pip install aws-cdk.core aws-cdk.pipelines aws-cdk.aws-codepipeline aws-cdk.aws-codepipeline-actions aws-cdk.aws-codedeploy aws-cdk.aws-apigateway aws-cdk.aws-lambda pytest requests pylint

$ pip freeze > requirements.txt

// only if you have populate this file
$ pip install -r requirements.txt
```

write your code
```
$ code .
```


At this point you can now synthesize the CloudFormation template for this code.
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


