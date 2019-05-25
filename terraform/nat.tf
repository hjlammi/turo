data "aws_ami" "nat" {
  most_recent = true
  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn-ami-vpc-nat-*"]
  }
}

resource "aws_security_group" "nat" {
  vpc_id = "${aws_vpc.turo.id}"
  name_prefix = "nat"
  ingress {
    description = "Private subnet"
    protocol = -1
    from_port = 0
    to_port = 0
    cidr_blocks = ["${aws_vpc.turo.cidr_block}"]
  }
  egress {
    description = "Internet access"
    protocol = -1
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags {
    Name = "NAT"
  }
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_network_interface" "nat" {
  subnet_id = "${aws_subnet.public.id}"
  security_groups = ["${aws_security_group.nat.id}"]
  source_dest_check = false
  tags {
    Name = "NAT"
  }
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_instance" "nat" {
  instance_type = "t2.nano"
  ami = "${data.aws_ami.nat.id}"
  network_interface {
    device_index = 0
    network_interface_id = "${aws_network_interface.nat.id}"
  }
  tags {
    Name = "NAT"
  }
  lifecycle {
    prevent_destroy = true
  }
}
