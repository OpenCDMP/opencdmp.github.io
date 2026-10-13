---
sidebar_position: 5
title: Evaluator services
description: Environment variables of the RDA maDMP, OSTrails, and OpenAIRE FAIR evaluator services
---

# Evaluator services

These are the settings of the shipped [evaluator services](/docs/optional-services/evaluator-services.md). Every evaluator also reads the [settings common to all plugin services](/docs/deployment/configuration/plugin-services.md#settings-common-to-all-plugin-services): `IDP_ISSUER_URI`, `IDP_CLAIMS_ROLES_PATH`, and `SECURITY_AUDIENCE` for authentication, `PROFILE`, and the logging settings. To make an evaluator available, register it in the API service with the RDA JSON transformer as its `rdaTransformerId`; see [Registering plugin services](/docs/deployment/configuration/plugin-services.md).

## Evaluator RDA maDMP

Validates the plan's RDA JSON export against the RDA maDMP schema. Image `opencdmp/evaluator-rda-madmp` on Docker Hub, plugin id `rda-maDMP`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `RDA_MADMP_RDA_SCHEMA` | JSON schema of the [RDA maDMP standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) that plans are validated against. | No | `classpath:schema/rda-schema.json` | `file:/config/rda-schema.json` |
| `RDA_MADMP_HAS_LOGO` | Show the evaluator's logo in the user interface. | No | `true` | `true` |
| `RDA_MADMP_LOGO_PATH` | Image of the logo. | No | `classpath:rda.png` | `file:/config/rda.png` |
| `RDA_MADMP_USE_SHARED_STORAGE` | Receive the RDA JSON file through a shared folder; see [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). Uses `STORAGE_PATH`. | No | `false` | `true` |

---

## Evaluator OSTrails

Sends the plan's RDA JSON export to the [OSTrails DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service). Image `opencdmp/evaluator-ostrails-dmp-evaluation-service` on Docker Hub, plugin id `ostrails`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `OSTRAILS_EVALUATOR_BASE_URL` | Base URL of the OSTrails DMP Evaluation Service that the evaluator calls. | Yes | - | `https://dmp-evaluation.example.org` |
| `OSTRAILS_EVALUATOR_USE_REMOTE_BENCHMARKS` | Read the available benchmarks from the OSTrails service. When `false`, the evaluator offers the benchmarks listed in its configuration file. | No | `true` | `true` |
| `OSTRAILS_EVALUATOR_USE_REMOTE_TESTS` | Read the available tests from the OSTrails service. When `false`, the evaluator offers the tests listed in its configuration file. | No | `true` | `true` |
| `OSTRAILS_EVALUATOR_HAS_LOGO` | Show the evaluator's logo in the user interface. | No | `true` | `true` |
| `OSTRAILS_EVALUATOR_LOGO_PATH` | Image of the logo. | No | `classpath:ostrails.png` | `file:/config/ostrails.png` |
| `OSTRAILS_EVALUATOR_USE_SHARED_STORAGE` | Declared by the evaluator, which has no shared folder. Leave it `false`. | No | `false` | `false` |

---

## Evaluator OpenAIRE FAIR

Asks the OpenAIRE validator to assess the published record of each asset against the FAIR guidelines. Plugin id `openaire-fair`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `FAIR_EVALUATOR_BASE_URL` | Base URL of the OpenAIRE service that evaluates records against the FAIR guidelines. | Yes | - | `https://validator.example.org` |
| `FAIR_EVALUATOR_USE_REMOTE_BENCHMARKS` | Read the available guidelines from the OpenAIRE service. When `false`, the evaluator offers the guidelines listed in its configuration file. | No | `true` | `true` |
| `FAIR_EVALUATOR_HAS_LOGO` | Show the evaluator's logo in the user interface. | No | `true` | `true` |
| `FAIR_EVALUATOR_LOGO_PATH` | Image of the logo. | No | `classpath:openaire.png` | `file:/config/openaire.png` |
| `FAIR_EVALUATOR_USE_SHARED_STORAGE` | Declared by the evaluator, which has no shared folder. Leave it `false`. | No | `false` | `false` |

---

## See also

- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - Run, register, and test an evaluator, and the settings every plugin shares
- [Backend configuration: evaluator service authentication](/docs/deployment/configuration/backend/index.md#evaluator-service-authentication) - The client the API service signs in with
- [Evaluator services](/docs/optional-services/evaluator-services.md) - What each evaluator checks
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The `plugins` client scope
