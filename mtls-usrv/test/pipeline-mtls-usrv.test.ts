import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PipelineMtlsUsrv from '../lib/pipeline-mtls-usrv-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PipelineMtlsUsrv.PipelineMtlsUsrvStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
