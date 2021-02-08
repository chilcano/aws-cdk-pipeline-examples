#!/usr/bin/env python3

from aws_cdk import core

#from pipeline_mtls_authn.pipeline_mtls_authn_stack import PipelineMtlsAuthnStack
from pipeline_mtls_authn.pipeline_stack import PipelineStack

app = core.App()
#PipelineMtlsAuthnStack(app, "pipeline-mtls-authn")
PipelineStack(app, 'PipelineStack', env={
    'account': '630895193694',
    'region': 'eu-west-2',
})

app.synth()
