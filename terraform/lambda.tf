resource "aws_security_group" "turo_lambda" {
  vpc_id = "${aws_vpc.turo.id}"
  name_prefix = "turo_lambda"
  egress {
    description = "Internet access"
    protocol = -1
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags {
    Name = "turo_lambda"
  }
}
