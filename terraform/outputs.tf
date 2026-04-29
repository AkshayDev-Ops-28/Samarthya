output "service_name" {
  description = "Name of the Kubernetes service"
  value       = kubernetes_service.samarthya.metadata[0].name
}

output "service_cluster_ip" {
  description = "ClusterIP assigned to the service"
  value       = kubernetes_service.samarthya.spec[0].cluster_ip
}

output "deployment_name" {
  description = "Name of the deployment"
  value       = kubernetes_deployment.samarthya.metadata[0].name
}

output "hpa_name" {
  description = "Name of the HPA resource"
  value       = kubernetes_horizontal_pod_autoscaler_v2.samarthya.metadata[0].name
}