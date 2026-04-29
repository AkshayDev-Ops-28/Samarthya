variable "image_name" {
  description = "Docker image to deploy"
  type        = string
  default     = "akshaydevops28/samarthya-app:latest"
}

variable "app_namespace" {
  description = "Kubernetes namespace for the application"
  type        = string
  default     = "default"
}

variable "monitoring_namespace" {
  description = "Kubernetes namespace for monitoring stack"
  type        = string
  default     = "monitoring"
}

variable "replicas" {
  description = "Initial number of pod replicas"
  type        = number
  default     = 2
}

variable "min_replicas" {
  description = "Minimum replicas for HPA"
  type        = number
  default     = 2
}

variable "max_replicas" {
  description = "Maximum replicas for HPA"
  type        = number
  default     = 10
}

variable "cpu_target_percent" {
  description = "Target CPU utilization percentage for HPA"
  type        = number
  default     = 50
}