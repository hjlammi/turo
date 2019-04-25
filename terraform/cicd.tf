locals {
  pipeline_name = "turo-pipeline"
  github_username = "hjlammi"
  github_repo = "turo"
  app = "turo-app"
}

data "aws_ssm_parameter" "github_token" {
  name = "github_token"
}

# CodePipeline resources
resource "aws_s3_bucket" "build_artifact_bucket" {
  bucket = "${local.pipeline_name}-artifact-bucket"
  acl    = "private"
}

resource "aws_s3_bucket" "cache" {
  bucket = "${local.pipeline_name}-cache"
  acl    = "private"
}

resource "aws_s3_bucket" "turo_app" {
  bucket = "${local.app}"
  acl    = "public-read"
  policy = "${file("policy.json")}"

  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"AddPerm",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${local.app}/*"]
    }
  ]
}
POLICY

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

data "aws_iam_policy_document" "codepipeline_assume_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name               = "${local.pipeline_name}-codepipeline-role"
  assume_role_policy = "${data.aws_iam_policy_document.codepipeline_assume_policy.json}"
}

# CodePipeline policy needed to use CodeCommit and CodeBuild
resource "aws_iam_role_policy" "attach_codepipeline_policy" {
  name = "${local.pipeline_name}-codepipeline-policy"
  role = "${aws_iam_role.codepipeline_role.id}"

  policy = <<EOF
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetBucketVersioning",
                "s3:PutObject"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "cloudwatch:*",
                "sns:*",
                "sqs:*",
                "iam:PassRole"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "codebuild:BatchGetBuilds",
                "codebuild:StartBuild"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ],
    "Version": "2012-10-17"
}
EOF
}

# CodeBuild IAM Permissions
resource "aws_iam_role" "codebuild_assume_role" {
  name = "${local.pipeline_name}-codebuild-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codebuild_policy" {
  name = "${local.pipeline_name}-codebuild-policy"
  role = "${aws_iam_role.codebuild_assume_role.id}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
       "s3:PutObject",
       "s3:GetObject",
       "s3:GetObjectVersion",
       "s3:GetBucketVersioning",
       "s3:ListBucket",
       "s3:ListObjects",
       "s3:DeleteObject"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Resource": [
        "${aws_codebuild_project.build_project.id}"
      ],
      "Action": [
        "codebuild:*"
      ]
    },
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
        "Action": [
          "cloudformation:CreateStack",
          "cloudformation:Describe*",
          "cloudformation:ValidateTemplate",
          "cloudformation:UpdateStack",
          "cloudformation:List*",
          "iam:GetRole",
          "iam:CreateRole",
          "iam:PutRolePolicy",
          "iam:DeleteRolePolicy",
          "iam:DeleteRole",
          "iam:PassRole",
          "lambda:UpdateFunctionCode",
          "lambda:Get*",
          "lambda:CreateFunction",
          "lambda:InvokeFunction",
          "lambda:UpdateFunctionConfiguration",
          "lambda:PublishVersion",
          "lambda:DeleteFunction",
          "lambda:List*",
          "lambda:AddPermission",
          "s3:CreateBucket",
          "s3:DeleteObject",
          "s3:GetObject",
          "s3:GetBucketLocation",
          "s3:ListBucket",
          "s3:PutObject",
          "s3:DeleteBucket",
          "s3:SetBucketEncryption",
          "s3:GetEncryptionConfiguration",
          "s3:PutEncryptionConfiguration",
          "logs:Describe*",
          "logs:CreateLogGroup",
          "logs:DeleteLogGroup",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:CreateNetworkInterface",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DeleteNetworkInterface",
          "ec2:DescribeDhcpOptions",
          "iam:AWSCodeBuildDeveloperAccess"
        ],
        "Resource": "*",
        "Effect": "Allow"
    },
    {
        "Effect": "Allow",
        "Action": [
            "ssm:GetParameter"
        ],
        "Resource": "${data.aws_ssm_parameter.db_instance_password.arn}"
    },
    {
        "Effect": "Allow",
        "Action": [
            "ec2:CreateNetworkInterface",
            "ec2:DescribeDhcpOptions",
            "ec2:DescribeNetworkInterfaces",
            "ec2:DeleteNetworkInterface",
            "ec2:DescribeSubnets",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeVpcs"
        ],
        "Resource": "*"
    },
    {
        "Effect": "Allow",
        "Action": [
            "ec2:*"
        ],
        "Resource": "*"
    },
    {
        "Effect": "Allow",
        "Action": [
            "apigateway:*"
        ],
        "Resource": [
            "arn:aws:apigateway:eu-west-1::/restapis"
        ]
    }
  ]
}
POLICY
}

# CodeBuild Section for the Package stage
resource "aws_codebuild_project" "build_project" {
  name          = "${local.pipeline_name}-build"
  description   = "The CodeBuild project for ${local.pipeline_name}"
  service_role  = "${aws_iam_role.codebuild_assume_role.arn}"
  build_timeout = "60"

  cache {
    type     = "S3"
    location = "${aws_s3_bucket.cache.bucket}"
  }

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/nodejs:10.14.1"
    type         = "LINUX_CONTAINER"
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "${file("${path.root}/../buildspec.yml")}"
  }

  vpc_config {
    vpc_id = "${aws_vpc.turo.id}"

    subnets = [
      "${aws_subnet.primary.id}"
    ]

    security_group_ids = [
      "${aws_security_group.codebuild.id}"
    ]
  }
}

resource "aws_security_group" "codebuild" {
  vpc_id = "${aws_vpc.turo.id}"
  name_prefix = "codebuild"
  egress {
    description = "Internet access"
    protocol = -1
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags {
    Name = "codebuild"
  }
}

# Full CodePipeline
resource "aws_codepipeline" "codepipeline" {
  name     = "${local.pipeline_name}-codepipeline"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store = {
    location = "${aws_s3_bucket.build_artifact_bucket.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["code"]

      configuration {
        Owner                = "${local.github_username}"
        OAuthToken           = "${data.aws_ssm_parameter.github_token.value}"
        Repo                 = "${local.github_repo}"
        Branch               = "master"
        PollForSourceChanges = "true"
      }
    }
  }

  stage {
    name = "DeployToS3"

    action {
      name             = "DeployToS3"
      category         = "Test"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["code"]
      output_artifacts = ["deployed"]
      version          = "1"

      configuration {
        ProjectName = "${aws_codebuild_project.build_project.name}"
      }
    }
  }
}
