terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
}

module "eks" {
  source = "./modules/eks"

  cluster_name    = var.cluster_name
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  node_group_name = var.node_group_name
}

module "rds" {
  source = "./modules/rds"

  db_name            = var.db_name
  db_user            = var.db_user
  db_password        = var.db_password
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  eks_security_group = module.eks.node_security_group_id
}

module "ecr" {
  source = "./modules/ecr"
  repository_names = var.repository_names
}

module "s3" {
  source = "./modules/s3"
  bucket_name = var.bucket_name
}
