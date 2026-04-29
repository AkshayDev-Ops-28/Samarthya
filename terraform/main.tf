terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.27"
    }
  }
  required_version = ">= 1.3.0"
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

resource "kubernetes_deployment" "samarthya" {
  metadata {
    name      = "samarthya-deployment"
    namespace = var.app_namespace
    labels = {
      app = "samarthya"
    }
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = {
        app = "samarthya"
      }
    }

    template {
      metadata {
        labels = {
          app = "samarthya"
        }
      }

      spec {
        container {
          name  = "samarthya-app"
          image = var.image_name

          port {
            container_port = 3000
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "samarthya" {
  metadata {
    name      = "samarthya-service"
    namespace = var.app_namespace
  }
   wait_for_load_balancer = false 

  spec {
    selector = {
      app = "samarthya"
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "samarthya" {
  metadata {
    name      = "samarthya-hpa"
    namespace = var.app_namespace
  }

  spec {
    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.samarthya.metadata[0].name
    }

    min_replicas = var.min_replicas
    max_replicas = var.max_replicas

    metric {
      type = "Resource"
      resource {
        name = "cpu"
        target {
          type                = "Utilization"
          average_utilization = var.cpu_target_percent
        }
      }
    }
  }
}