import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as lambda from '@aws-cdk/aws-lambda';
import { App, Stack, StackProps, SecretValue } from '@aws-cdk/core';

export interface PipelineStackProps extends StackProps {
  readonly lambdaCode: lambda.CfnParametersCode;
  readonly repoName: string
}

export class PipelineStack extends Stack {
  constructor(app: App, id: string, props: PipelineStackProps) {
    super(app, id, props);

    //const code = codecommit.Repository.fromRepositoryName(this, 'ImportedRepo', props.repoName);

    const cdkBuild = new codebuild.PipelineProject(this, 'CdkBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: 'npm install',
          },
          build: {
            commands: [
              'npm run build',
              'npm run cdk synth -- -o dist'
            ],
          },
        },
        artifacts: {
          'base-directory': 'dist',
          files: [
            'HelloLambdaStack.template.json',
          ],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_2_0,
      },
    });

    const lambdaBuild = new codebuild.PipelineProject(this, 'LambdaBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'cd hello_lambda',
              'npm install',
            ],
          },
          build: {
            commands: 'npm run build',
          },
        },
        artifacts: {
          'base-directory': 'hello_lambda',
          files: [
            'index.js',
            'node_modules/**/*',
          ],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_2_0,
      },
    });

    const sourceOutput = new codepipeline.Artifact();
    const cdkBuildOutput = new codepipeline.Artifact('CdkBuildOutput');
    const lambdaBuildOutput = new codepipeline.Artifact('LambdaBuildOutput');

    new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'CDK-Pipeline-HelloLambda-TypeScript',
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.GitHubSourceAction({ 
              actionName: 'GitHub_Source',
              output: sourceOutput,
              owner: 'chilcano',
              oauthToken: SecretValue.secretsManager('GITHUB_TOKEN_AWS_ECS'),
              //repo: 'aws-cdk-pipeline-examples',
              repo: props.repoName,
              branch: 'hello-lambda-ts'
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'Lambda_Build',
              project: lambdaBuild,
              input: sourceOutput,
              outputs: [lambdaBuildOutput],
            }),
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CDK_Build',
              project: cdkBuild,
              input: sourceOutput,
              outputs: [cdkBuildOutput],
            }),
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'Lambda_CFN_Deploy',
              templatePath: cdkBuildOutput.atPath('HelloLambdaStack.template.json'),
              stackName: 'HelloLambdaDeploymentStack',
              adminPermissions: true,
              parameterOverrides: {
                ...props.lambdaCode.assign(lambdaBuildOutput.s3Location),
              },
              extraInputs: [lambdaBuildOutput],
            }),
          ],
        },
      ],
    });
  }
}