data "aws_ssm_parameter" "db_admin_password" {
  name = "turo_db_admin_password"
}

resource "aws_db_instance" "turo_db" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "11.1"
  instance_class       = "db.t2.micro"
  name                 = "turo_db"
  username             = "db_admin"
  password             = "${data.aws_ssm_parameter.db_admin_password.value}"
  db_subnet_group_name = "${aws_db_subnet_group.main.id}"
}

resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = ["${aws_subnet.primary.id}", "${aws_subnet.secondary.id}"]
}
