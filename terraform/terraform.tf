provider "aws" {
  version = "~> 2.0"
  region = "eu-west-1"
  profile = "turo-${terraform.workspace}"
}

terraform {
  backend "s3" {
    region = "eu-west-1"
    profile = "turo-dev"
    bucket = "turo-terraform-state"
    dynamodb_table = "turo-terraform-state-lock"
    encrypt = true
    key = "terraform_state"
  }
}
