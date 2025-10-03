---
sidebar_position: 2
description: A guide for the docker rabbitmq.env file.
---

# RabbitMQ

# Configuring the `rabbitmq.env` File

The `rabbitmq.env` file is a crucial component for deploying **OpenCDMP** using Docker Compose. It contains environment variables that specify:

- RabbitMQ's default user & password.
- RabbitMQ's base URL.

This file is located in the [`config-files/rabbitmq`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/rabbitmq) directory.

| Env Variable           | Description              | Default Value | Example          |
| ---------------------- | ------------------------ | ------------- | ---------------- |
| RABBITMQ_DEFAULT_USER  | RabbitMQ admin user.     | guest         | rabbit-admin     |
| RABBITMQ_DEFAULT_PASS  | RabbitMQ admin password. | guest         | `<your_passwrd>` |
| RABBITMQ_DEFAULT_VHOST | RabbitMQ base path.      | /             | `/<path>`        |