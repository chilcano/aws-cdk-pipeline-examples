from os import path
from aws_cdk import core

import aws_cdk.aws_lambda as lmb
import aws_cdk.aws_apigateway as apigw

class HelloLambdaStack(core.Stack):

    def __init__(self, scope: core.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        this_dir = path.dirname(__file__)
        
        handler = lmb.Function(self, 'Handler',
            runtime=lmb.Runtime.PYTHON_3_7,
            handler='handler.handler',
            code=lmb.Code.from_asset(path.join(this_dir, 'hello_lambda')))

        gw = apigw.LambdaRestApi(self, 'APIGatewayHelloLambdaWebservice',
            description='Endpoint for HelloLambdaWebservice',
            handler=handler.current_version)
        
        self.url_output = core.CfnOutput(self, 'HelloLambdaUrl', 
            value=gw.url)