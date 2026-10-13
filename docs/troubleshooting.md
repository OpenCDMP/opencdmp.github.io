---
sidebar_position: 7
title: Troubleshooting
description: Find the troubleshooting guide for your problem, for users, administrators, or the people who run the installation, and report what is still broken
---

# Troubleshooting

## Which kind of problem?

- **[Troubleshooting for users](/docs/using/troubleshooting.md)**: signing in, saving and finalizing, finding a plan, invitations, edit locks, downloads, uploads, notifications, and publishing errors.
- **[Troubleshooting for administrators](/docs/administering/troubleshooting.md)**: blueprints, templates, or statuses that users are not offered, reference searches and prefilling that return nothing, texts, webhooks, plugins, notifications, inviting users, search after an upgrade, and DOCX or PDF exports.
- **[Troubleshooting a deployment](/docs/deployment/troubleshooting.md)**: services that do not start, `401` errors after signing in, database migrations, Elasticsearch, RabbitMQ, Keycloak, memory limits, and plugin connectivity.

## How to report a problem

If the guides do not solve it, report the problem to your administrator, or to the OpenCDMP team on [GitHub Issues](https://github.com/OpenCDMP/OpenCDMP/issues). Include:

- **The version.** The OpenCDMP version (in the example Docker deployment, `MAIN_APP_TAG` of the `.env` file), and the versions of any plugin involved.
- **The steps.** What you did, what you expected, and what happened instead, with the exact error message or a screenshot. Say whether it happens for everyone or only for you, and since when.
- **The browser's view.** Open the developer tools (F12), reproduce the problem, and copy the red errors of the **Console** tab and the failing requests of the **Network** tab, with their status code (for example `401`, `403`, or `500`). Name the browser and its version.
- **The server log** (administrators). The lines of the API service log around the time of the problem, for example from `docker compose logs opencdmp.backend --since 10m`, and the log of any plugin involved.

Remove passwords, tokens, client secrets, and personal data from everything you send. Never send your password.

For general questions, write to opencdmp@cite.gr.

## Publishing fails and no DOI is returned {#deposit-fails-no-doi-returned}

See [Publishing fails and no DOI is returned](/docs/using/troubleshooting.md#deposit-fails-no-doi-returned). Administrators: see [Publishing fails for users](/docs/administering/troubleshooting.md#publishing-fails-for-users) for the error codes and what to check.
