import * as codedeploy from '@aws-cdk/aws-codedeploy';
import * as lambda from '@aws-cdk/aws-lambda';
//import { App, Stack, StackProps } from '@aws-cdk/core';

import * as cdk from '@aws-cdk/core';

export class HelloLambdaTsStack extends cdk.Stack {

  public readonly lambdaCode: lambda.CfnParametersCode;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    this.lambdaCode = lambda.Code.fromCfnParameters();

    const func = new lambda.Function(this, 'HelloLambda', {
      code: this.lambdaCode,
      handler: 'index.main',
      runtime: lambda.Runtime.NODEJS_10_X,
      description: `HelloLambda function generated on: ${new Date().toISOString()}`,
    });

    const alias = new lambda.Alias(this, 'HelloLambdaAlias', {
      aliasName: 'Prod',
      version: func.currentVersion,
    });

    new codedeploy.LambdaDeploymentGroup(this, 'HelloLambdaDeploymentGroup', {
      alias,
      deploymentConfig: codedeploy.LambdaDeploymentConfig.LINEAR_10PERCENT_EVERY_1MINUTE,
    });

  }
}
