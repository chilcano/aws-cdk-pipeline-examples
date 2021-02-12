#!/usr/bin/env python3

from aws_cdk import core

from hello_lambda_py.pipeline_stack import PipelineStack

app = core.App()

PipelineStack(app, 'Pipeline-HelloLambda-Stack', env={
    'account': '601163517885',      ## Data acc
    'region': 'eu-west-2',
})

app.synth()