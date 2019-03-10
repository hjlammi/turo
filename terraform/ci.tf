resource "aws_iam_role" "turo_pipeline" {
  name = "turo_pipeline"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "codepipeline_policy"
  role = "${aws_iam_role.turo_pipeline.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": "*",
      "Resource": [
        "${aws_s3_bucket.turo_pipeline.arn}",
        "${aws_s3_bucket.turo_pipeline.arn}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "turo_pipeline" {
  bucket = "turo-pipeline"
}

resource "aws_codepipeline" "turo_pipeline" {
  name = "turo_pipeline"
  role_arn = "${aws_iam_role.turo_pipeline.arn}"
  artifact_store = {
    location = "${aws_s3_bucket.turo_pipeline.bucket}"
    type = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source"]

      configuration = {
        Owner  = "hjlammi"
        Repo   = "turo"
        Branch = "master"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name            = "Build"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      input_artifacts = ["source"]
      version         = "1"

      configuration = {
        ProjectName = "turo-build"
      }
    }
  }
}
