import * as cdk from '@aws-cdk/core';
import { UsrvStack } from './usrv-stack';

export class UsrvStage extends cdk.Stage {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new UsrvStack(this, 'example', props);

  }

}