variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-2"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Public Subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "Private Subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "availability_zones" {
  description = "Availability Zones"
  type        = list(string)
  default     = ["ap-south-2a", "ap-south-2b"]
}

variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
  default     = "birthday-app-cluster"
}

variable "node_group_name" {
  description = "EKS Node Group Name"
  type        = string
  default     = "birthday-app-nodes"
}

variable "db_name" {
  description = "RDS Database Name"
  type        = string
  default     = "birthdaydb"
}

variable "db_user" {
  description = "RDS Database User"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "RDS Database Password"
  type        = string
  sensitive   = true
}

variable "bucket_name" {
  description = "S3 bucket name for photos"
  type        = string
  default     = "birthday-app-celebration-photos-637043415174"
}

variable "repository_names" {
  description = "List of ECR repository names"
  type        = list(string)
  default     = [
    "birthday-user-service",
    "birthday-birthday-service",
    "birthday-notification-service",
    "birthday-celebration-service",
    "birthday-frontend"
  ]
}
