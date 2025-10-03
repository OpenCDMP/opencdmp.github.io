---
sidebar_position: 2
description: A guide for the docker elk.env file.
---

# Elasticsearch

# Configuring the `elk.env` File

The `elk.env` file is a crucial component for deploying **OpenCDMP** using Docker Compose. It contains environment variables that specify:

- Elasticsearch's deployment settings. More configuration can be added from the official documentation of Elasticsearch.

This file is located in the [`config-files/elk`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/elk) directory.

| Env Variable     | Description                                                              | Default Value | Example      |
| ---------------- | ------------------------------------------------------------------------ | ------------- | ------------ |
| ELASTIC_PASSWORD | Elasticsearch default password for the opencdmp.elasticsearch container. | elastic       | `<password>` |