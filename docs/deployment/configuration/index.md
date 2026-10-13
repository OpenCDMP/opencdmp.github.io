---
title: Configuration
sidebar_position: 2
description: Configuration reference of every OpenCDMP service - Keycloak, the infrastructure, the API service, the supplementary services, the plugins, the webapp, and logging
---

# Configuration

This section is the configuration reference of every OpenCDMP service. Each Java service reads its settings from `app-<PROFILE>.env` in its `config` folder, or from the environment of its container; in the Docker example these files are under `config-files/opencdmp/<service>/config/`. The `.env` file next to the Compose files holds the image versions, ports, and folders, and the settings of the webapp.

:::tip New to OpenCDMP?
Start with the [Installation](/docs/deployment/install/index.md) to get a working installation first. Return here when you need to customize individual services beyond the default configuration.
:::

import DocCardList from '@theme/DocCardList';

<DocCardList />