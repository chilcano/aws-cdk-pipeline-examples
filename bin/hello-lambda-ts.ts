#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HelloLambdaTsStack } from '../lib/hello-lambda-ts-stack';

const app = new cdk.App();
new HelloLambdaTsStack(app, 'HelloLambdaTsStack');
