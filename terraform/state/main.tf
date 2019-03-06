provider "aws" {
  version = "~> 2.0"
  region = "eu-west-1"
  profile = "turo-dev"
}

resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "turo-terraform-state"
  versioning {
    enabled = true
  }
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_dynamodb_table" "terraform_state_lock" {
  name = "turo-terraform-state-lock"
  hash_key = "LockID"
  read_capacity = 1
  write_capacity = 1
  attribute {
    name = "LockID"
    type = "S"
  }
}
