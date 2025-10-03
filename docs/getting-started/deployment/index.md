---
sidebar_position: 1
description: A guide for the test deployment of OpenCDMP.
---

# Deployment

### **Docker Containers**

OpenCDMP is containerized using Docker, with each service running on its own Docker container. This isolation ensures consistency across environments and simplifies deployment.

### **Simple Deployment**
Deployment configuration is provided to simplify deployment process for testing purposes.

#### **Prerequisites**
1. **Docker and Docker Compose**:

   - [Install Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher recommended)
   - [Install Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher recommended)

2. **Docker Deployment Knowledge**

#### **Deployment Steps**

1. **Clone the demo deployment Repository**:

   ```bash
   git clone https://github.com/OpenCDMP/docker-deployment.git
   cd docker-deployment
   ```

2. **Start the Services**:

   ```bash
   # make sure the deploy script is executable
   chmod 700 deploy_opencdmp.sh

   # Run the deploy script
   ./deploy_opencdmp.sh
   ```
   - If you get the error "**-bash: ./deploy_opencdmp.sh: cannot execute: required file not found**", it means the script has **Windows** (CRLF) line endings and you need to convert it to **Unix** (LF). You can either do this by hand in a text editor of your choice or run the following command.

   ```bash
   sed -i 's/\r$//' deploy_opencdmp.sh
   ```

1. **Verify the Deployment**:

   ```bash
   docker compose ps
   ```

4. **Access the Application**:

   - Navigate to `http://host.docker.internal:8081/`.
   - Replace `host.docker.internal` with your domain or IP if configured differently.
   - Log in with OpenCDMP's admin user.
   ```text
   User: opencdmp-admin
   Pass: admin
   ```

5. **Access and Configure Keycloak (Authentication Service)**:

   - Navigate to `http://host.docker.internal:8081/auth/`.
   - Log in with Keycloak's admin user.
   ```text
      User: keycloak-admin
      Pass: admin
   ```
   - Configure realms, clients, users, and roles as needed. (For security reasons, change the password for the keycloak-admin user or recreate it with your own credentials)


### **Advanced Deployment**
OpenCDMP offers various configuration options per installation. The files at the [deployment](https://github.com/OpenCDMP/docker-deployment) can be used as a starting point, and edited accordingly. All env files are explained [here](getting-started/configuration/infrastructure/index.md).

The deployment process should be the same as long as the modified configuration is correct.
<!-- ### **Scalability and Extensibility**

OpenCDMP is designed with scalability and extensibility in mind, allowing the system to grow and adapt according to organizational needs.

#### **Scalability**

**Horizontal Scaling**: Individual services can be scaled horizontally by adding more instances to handle increased load.

- **Docker Compose Scaling**: Use Docker Compose to scale services. For example, to scale the `api-service` to run three instances:
  ```bash
   docker compose up -d --scale api-service=3
  ```
- **Load Balancing**: The Nginx reverse proxy can be configured to distribute incoming requests across multiple instances of services.

- **Update Nginx Configuration**: Modify the Nginx configuration to include upstream servers.

  ```
  upstream api_service {
      server api-service:8080;
      server api-service-1:8080;
      server api-service-2:8080;
  }

  server {
      listen 80;
      location /api/ {
          proxy_pass http://api_service/;
          # Additional proxy settings
      }
  }
  ```

- **Dynamic Scaling**: Use container orchestration platforms like Kubernetes or Docker Swarm for more advanced scaling and management. -->