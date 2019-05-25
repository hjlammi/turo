resource "aws_instance" "bastion" {
  ami           = "ami-06a376457af6d8e1c"
  instance_type = "t2.nano"
  key_name      = "hedu"
  network_interface {
    device_index = 0
    network_interface_id = "${aws_network_interface.bastion.id}"
  }

  tags = {
    Name = "bastion"
  }
}

resource "aws_security_group" "bastion" {
  vpc_id = "${aws_vpc.turo.id}"
  name_prefix = "bastion"
  ingress {
    description = "SSH from trusted IPs"
    protocol = "tcp"
    from_port = 22
    to_port = 22
    cidr_blocks = ["88.115.124.36/32"]
  }
  egress {
    description = "Internet access"
    protocol = -1
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags {
    Name = "bastion"
  }
}

resource "aws_network_interface" "bastion" {
  subnet_id = "${aws_subnet.public.id}"
  security_groups = ["${aws_security_group.bastion.id}"]
  tags {
    Name = "bastion"
  }
}
