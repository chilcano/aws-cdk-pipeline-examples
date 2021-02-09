#!/usr/bin/env node
//import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HelloLambdaTsStack } from '../lib/hello-lambda-ts-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const GITHUB_REPO_NAME = "aws-cdk-pipeline-examples";
const app = new cdk.App();
//new HelloLambdaTsStack(app, 'HelloLambdaTsStack');

const lambdaStack = new HelloLambdaTsStack(app, 'HelloLambdaStack');

new PipelineStack(app, 'PipelineDeployingLambdaStack', {
  lambdaCode: lambdaStack.lambdaCode,
  repoName: GITHUB_REPO_NAME
});

app.synth();