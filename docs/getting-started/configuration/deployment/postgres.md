---
sidebar_position: 2
description: A guide for the docker postgres.env file.
---

# Postgresql

# Configuring the `postgres.env` File

The `postgres.env` file is a crucial component for deploying **OpenCDMP** using Docker Compose. It contains environment variables that specify:

- Postgres' admin user & password.

This file is located in the `deployment/config-files/postgres` directory.

| Env Variable      | Description              | Default Value | Example           |
| ----------------- | ------------------------ | ------------- | ----------------- |
| POSTGRES_USER     | Postgres admin user.     | postgres      | postgres          |
| POSTGRES_PASSWORD | Postgres admin password. | -             | `<your_password>` |