---
sidebar_position: 2
description: A guide for the docker postgres.env file and initialization database scripts.
---

# Postgresql

## Configuring the `postgres.env` File

The `postgres.env` file is a crucial component for deploying **OpenCDMP** using Docker Compose. It contains environment variables that specify:

- Postgres' admin user & password.

This file is located in the [`config-files/postgres`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/postgres) directory.

| Env Variable      | Description              | Default Value | Example           |
| ----------------- | ------------------------ | ------------- | ----------------- |
| POSTGRES_USER     | Postgres admin user.     | postgres      | postgres          |
| POSTGRES_PASSWORD | Postgres admin password. | -             | `<your_password>` |

---

## Initialization Database Scripts

Alongside the `postgres.env` file, there is a directory with **initialization scripts** that are executed when the PostgreSQL container is created for the first time. This scripts are located in the [`config-files/postgres/init-scripts`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/postgres/init-scripts) directory.


### How It Works

When the container is launched for the first time, all the provided SQL scripts are executed in sequence.

### Purpose of the Scripts

The init scripts are used to:

- Create the required **databases** and **schemas**.
- Insert initial configuration data necessary for OpenCDMP to run.

### Important Notes

- These scripts only run when the database volume is empty (first container initialization).
  If the database already exists, the scripts will **not** be executed again.
- To apply changes after the database has been initialized, you should use the **database migration mechanism** (see [Database Migrations](getting-started/deployment/upgrade.md#step-4-run-database-migrations-if-needed)).

---