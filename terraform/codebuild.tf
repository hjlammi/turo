resource "aws_iam_role" "codebuild_role" {
  name = "turo-codebuild"

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

resource "aws_iam_policy" "codebuild_policy" {
  name = "TuroCodeBuildPolicy"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "${aws_s3_bucket.turo_pipeline.arn}"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "codebuild_attach" {
  role = "${aws_iam_role.codebuild_role.name}"
  policy_arn = "${aws_iam_policy.codebuild_policy.arn}"
}

resource "aws_codebuild_project" "project" {
  name = "turo"
  description = "Turo codebuild project for CI deployment. Part of Secure Programming coursework."
  build_timeout = "60"
  service_role = "${aws_iam_role.codebuild_role.arn}"

  artifacts {
    type = "S3"
    location = "${aws_s3_bucket.turo_pipeline.arn}"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/nodejs:6.3.1"
    type         = "LINUX_CONTAINER"
  }

  source {
    type = "CODEPIPELINE"
  }
}
