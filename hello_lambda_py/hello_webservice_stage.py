from aws_cdk import core

from .hello_lambda_stack import HelloLambdaStack

class HelloWebserviceStage(core.Stage):
  def __init__(self, scope: core.Construct, id: str, **kwargs):
    super().__init__(scope, id, **kwargs)

    service = HelloLambdaStack(self, 'HelloWebservice')

    self.url_output = service.url_output