#!/usr/bin/env python3

from aws_cdk import core

from test_01.test_01_stack import Test01Stack


app = core.App()
Test01Stack(app, "test-01")

app.synth()
