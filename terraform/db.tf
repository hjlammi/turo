data "aws_ssm_parameter" "db_instance_password" {
  name = "db_instance_password"
}

resource "aws_db_instance" "turo_db" {
  allocated_storage       = 20
  storage_type            = "gp2"
  engine                  = "postgres"
  engine_version          = "11.1"
  instance_class          = "db.t2.micro"
  identifier              = "turodb"
  name                    = "turo_db"
  username                = "db_admin"
  password                = "${data.aws_ssm_parameter.db_instance_password.value}"
  db_subnet_group_name    = "${aws_db_subnet_group.main.id}"
  vpc_security_group_ids  = ["${aws_security_group.db.id}"]
}

resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = ["${aws_subnet.primary.id}", "${aws_subnet.secondary.id}"]
}

resource "aws_security_group" "db" {
  vpc_id = "${aws_vpc.turo.id}"
  name_prefix = "db"
  ingress {
    protocol = "tcp"
    from_port = 5432
    to_port = 5432
    security_groups = [
      "${aws_security_group.codebuild.id}",
      "${aws_security_group.bastion.id}"
    ]
  }
  tags {
    Name = "db"
  }
}
