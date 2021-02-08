from aws_cdk import core

from .pipeline_mtls_authn_stack import PipelineMtlsAuthnStack

class WebServiceStage(core.Stage):
  def __init__(self, scope: core.Construct, id: str, **kwargs):
    super().__init__(scope, id, **kwargs)

    service = PipelineMtlsAuthnStack(self, 'WebService')

    self.url_output = service.url_output