version = 0.1
[y.deploy.parameters]
stack_name = "dan-test-945"
resolve_s3 = true
s3_prefix = "dan-test-945"
region = "eu-west-2"
capabilities = "CAPABILITY_IAM"
disable_rollback = true
parameter_overrides = "Environment=\"dev\" VpcStackName=\"vpc-cri\" PermissionsBoundary=\"none\" MaxContainerCount=\"12\" MinContainerCount=\"3\" EnableScalingInDev=\"0\""
image_repositories = []
