# Project Samarthya 🌱
### A Full-Stack DevOps Capstone Project — LaunchED Global Internship 2026

---

## What is Samarthya?

Samarthya is a volunteer and campaign management platform built to connect NGOs with volunteers across India. The platform allows organizations to post campaigns, track volunteer hours, and measure social impact — all through a clean, responsive web interface.

But Samarthya isn't just a web app. The real story of this project is the **infrastructure behind it** — a complete, production-grade DevOps pipeline built from scratch over 5 days, covering everything from containerization to live monitoring to infrastructure as code.

---

## Live Demo

- **Vercel (Frontend):** [akshay-samarthya.vercel.app](https://akshay-samarthya.vercel.app)
- **Docker Hub:** [akshaydevops28/samarthya-app](https://hub.docker.com/r/akshaydevops28/samarthya-app)
- **GitHub Repository:** [github.com/akshaydevops28/samarthya](https://github.com/akshaydevops28/samarthya)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Containerization | Docker |
| Container Registry | Docker Hub |
| Orchestration | Kubernetes (Minikube) |
| Auto-scaling | Kubernetes HPA |
| CI/CD | GitHub Actions |
| Monitoring | Prometheus + Grafana (kube-prometheus-stack) |
| Infrastructure as Code | Terraform (Kubernetes Provider) |
| Web Server | Nginx |
| Deployment | Vercel (frontend) |

---

## Project Architecture

```
Developer pushes code to GitHub
        │
        ▼
GitHub Actions CI/CD Pipeline
        │
        ├── Build React app (Vite)
        ├── Build Docker image
        ├── Push to Docker Hub
        └── Deploy to Vercel
                │
                ▼
        Kubernetes Cluster (Minikube)
                │
                ├── Deployment (samarthya-app pods)
                ├── Service (LoadBalancer, port 80)
                └── HPA (auto-scales 2–10 pods at 50% CPU)
                        │
                        ▼
        Monitoring Namespace
                │
                ├── Prometheus (metrics collection)
                └── Grafana (live dashboards)
```

---

## Project Journey — 5 Days, 5 Milestones

### Day 1 — Docker 🐳
The first step was containerizing the Samarthya app so it could run consistently anywhere — on my machine, a server, or the cloud.

- Wrote a `Dockerfile` for the React + Nginx app
- Built the image locally and tested it
- Pushed the image to Docker Hub

```bash
docker build -t akshaydevops28/samarthya-app:latest .
docker push akshaydevops28/samarthya-app:latest
docker run -p 3000:3000 akshaydevops28/samarthya-app:latest
```

---

### Day 2 — CI/CD Pipeline ⚙️
Manual builds are error-prone and slow. I automated the entire build and deploy process using GitHub Actions.

Every `git push` to `main` now automatically:
1. Installs dependencies and builds the Vite app
2. Builds and pushes the Docker image to Docker Hub
3. Deploys the latest frontend to Vercel

Pipeline file: `.github/workflows/deploy.yml`

---

### Day 3 — Kubernetes Orchestration ☸️
Running one container is easy. Running it reliably at scale is what Kubernetes solves.

- Wrote `deployment.yaml` — runs 2 replicas of the app by default
- Wrote `service.yaml` — exposes the app via a LoadBalancer on port 80
- Wrote `hpa.yaml` — automatically scales pods between 2 and 10 based on CPU usage

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl get pods
kubectl get hpa --watch
```

HPA configuration:
- Minimum pods: 2
- Maximum pods: 10
- Scale trigger: CPU > 50%

---

### Day 4 — Monitoring with Prometheus + Grafana 📊
You can't manage what you can't measure. I set up a full monitoring stack using the `kube-prometheus-stack` Helm chart.

- Installed Prometheus for metrics collection across the cluster
- Installed Grafana for live visual dashboards
- Ran a load test using a `busybox` pod to simulate traffic
- Watched the HPA scale pods live on the Grafana dashboard

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.adminPassword=admin123

# Access Grafana
kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring
# Browser → http://localhost:3000 | admin / admin123
```

Load test command used:
```bash
kubectl run load-generator --image=busybox:1.28 --restart=Never -it --rm \
  -- /bin/sh -c "while true; do wget -q -O- http://samarthya-service/; done"
```

---

### Day 5 — Terraform Infrastructure as Code 🏗️
The final milestone was replacing manual `kubectl apply` commands with Terraform — a proper Infrastructure as Code approach.

Terraform now manages:
- Kubernetes Deployment
- Kubernetes Service (LoadBalancer)
- Kubernetes HPA

```bash
cd terraform/
terraform init      # Download providers
terraform plan      # Preview changes
terraform apply     # Apply infrastructure
terraform destroy   # Tear down (when needed)
```

The key difference:
| `kubectl apply` | `terraform apply` |
|---|---|
| Imperative — you tell K8s what to do | Declarative — you describe end state |
| No state tracking | Maintains `terraform.tfstate` |
| Manual change tracking | Tracks every change automatically |

---

## Repository Structure

```
Samarthya/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── k8s/
│   ├── deployment.yaml         # Kubernetes Deployment
│   ├── service.yaml            # Kubernetes Service
│   └── hpa.yaml                # Horizontal Pod Autoscaler
├── terraform/
│   ├── main.tf                 # Provider + all K8s resources
│   ├── variables.tf            # Configurable inputs
│   └── outputs.tf              # Output values after apply
├── src/                        # React source code
├── public/                     # Static assets
├── Dockerfile                  # Container definition
├── nginx.conf                  # Nginx web server config
├── vite.config.js              # Vite build config
└── package.json
```

---

## How to Run Locally

### Prerequisites
- Docker Desktop
- Minikube
- kubectl
- Helm
- Terraform
- Node.js 20+

### 1. Clone the repo
```bash
git clone https://github.com/akshaydevops28/samarthya.git
cd samarthya
```

### 2. Run with Docker
```bash
docker build -t samarthya-app .
docker run -p 3000:3000 samarthya-app
# Open http://localhost:3000
```

### 3. Run on Kubernetes
```bash
# Start Minikube
minikube start

# Apply manifests
kubectl apply -f k8s/

# Open in browser
minikube service samarthya-service
```

### 4. Deploy with Terraform
```bash
cd terraform/
terraform init
terraform apply
```

### 5. Start Monitoring
```bash
kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring
# Open http://localhost:3000 | admin / admin123
```

---

## Key Lessons Learned

1. Always start Docker Desktop before running `minikube start`
2. Refresh PATH after installing CLI tools on Windows — winget installs to its own folder
3. `kubectl port-forward` terminal must stay open — closing it kills the browser connection
4. `--rm` flag on `kubectl run` only cleans up on clean exit — force-closed terminals leave ghost pods
5. `ContainerCreating` is not an error — it is pulling the image. Only panic at `ErrImagePull`
6. `wait_for_load_balancer = true` hangs forever on Minikube — always set it to `false` for local clusters
7. Never press Enter to confirm a GitHub Secret — click the button. Enter adds a hidden `\n` that breaks secret values

---

## Internship Details

- **Intern:** Akshay
- **Internship Program:** LaunchED Global Internship 2026
- **Domain:** DevOps
- **Project Title:** Project Samarthya — Full Stack DevOps Pipeline
- **Submission Deadline:** 30th April 2026

---

*Built with curiosity, broken and fixed many times, and finally shipped. That's DevOps.*