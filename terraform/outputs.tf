output "rds_endpoint" {
  description = "The endpoint of the RDS instance"
  value       = module.rds.db_instance_endpoint
}

output "eks_cluster_name" {
  description = "The name of the EKS cluster"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "The endpoint for the EKS cluster"
  value       = module.eks.cluster_endpoint
}

output "vpc_id" {
  description = "The VPC ID"
  value       = module.vpc.vpc_id
}

output "ecr_repository_urls" {
  value = module.ecr.repository_urls
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}
