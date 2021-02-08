import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codebuild from '@aws-cdk/aws-codebuild';

import * as iam from '@aws-cdk/aws-iam';
import * as pipelines from '@aws-cdk/pipelines';
import { App, Stack, StackProps, SecretValue } from '@aws-cdk/core';

import { UsrvStage } from './usrv-stage';

export class PipelineMtlsUsrvStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact("SrcArtifact");
    const cloudAssemblyArtifact = new codepipeline.Artifact("CloudAssemblyArtifact");

    const pipeline = new pipelines.CdkPipeline(this, 'Pipeline', {
      pipelineName: 'cdk-pipeline-mtls-usrv',
      cloudAssemblyArtifact: cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: cdk.SecretValue.secretsManager('github-token-playground-mtls-authn'),
        owner: 'chilcano',
        //repo: 'order-service',
        repo: 'pipeline-mtls-usrv',
        branch: 'master'
      }),

      synthAction: pipelines.SimpleSynthAction.standardNpmSynth({
        sourceArtifact: sourceArtifact,
        cloudAssemblyArtifact: cloudAssemblyArtifact,
        //subdirectory: 'cdk',
        buildCommand: 'npm run build',
        environment: {
          privileged: true
        }
      }),
    });

    pipeline.addApplicationStage(new UsrvStage(this, 'PROD'))

  }
}
