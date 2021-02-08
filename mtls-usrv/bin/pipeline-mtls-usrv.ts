#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { UsrvStack } from '../lib/usrv-stack';
import { PipelineMtlsUsrvStack } from '../lib/pipeline-mtls-usrv-stack';

const app = new cdk.App();
new UsrvStack(app, 'UsrvStack');
new PipelineMtlsUsrvStack(app, 'PipelineMtlsUsrvStack');
app.synth();