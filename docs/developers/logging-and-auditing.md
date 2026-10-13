---
sidebar_position: 7
title: Logging and auditing
description: How OpenCDMP services log and audit, and where to find the operator logging guide and the audit event reference
---

# Logging and auditing

OpenCDMP's backend services share one logging setup built on [Logback](https://logback.qos.ch/) (SLF4J). Each service writes two files: a **troubleshooting log**, `logging.log`, for diagnostics, and an **audit log**, `auditing.log`, with one line per audited API call. The two share a request id, so the audit line of a call and the troubleshooting lines it produced can be matched.

- **Running an installation?** [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) explains where each service writes its logs, how to change the log levels, the format of both files, how to follow a request through them, and the health and metrics endpoints.
- **Looking up an audit event?** The [audit event reference](/docs/developers/audit-events.md) lists every event the API service records, with its id and trigger.

## Writing log entries

These conventions apply to code that runs in the OpenCDMP services or in a plugin built on the same libraries.

Application code uses the `LoggerService` wrapper (from `gr.cite.tools.logging`) around a standard SLF4J logger. The following levels are used:

| Level | When used |
|---|---|
| `DEBUG` | Entry into a service method or controller action, with the entity type, id, and requested fields. Not written by default: OpenCDMP's own code (`org.opencdmp`) logs at `INFO` unless an operator raises it. |
| `INFO` | Notable events, such as startup, migrations, and the summaries of background tasks. |
| `WARN` | Unexpected but recoverable conditions. |
| `ERROR` | Unhandled exceptions and critical failures. |

`LOGGING_DEFAULT_LOG_LEVEL` sets the level of the framework loggers only; see [Log levels](/docs/deployment/configuration/logging-and-monitoring.md#log-levels).

Structured log entries are produced using `MapLogEntry` to attach key-value context:

```java
// Simple string message
logger.debug("querying {}", Plan.class.getSimpleName());

// Structured entry with key-value pairs
logger.debug(new MapLogEntry("retrieving " + Plan.class.getSimpleName())
    .And("id", id)
    .And("fields", fieldSet));
```

Do not log secrets or whole request bodies at any level: deposit requests carry decrypted credentials, and plans carry personal data.

## Audit event reference {#audit-event-reference}

Controllers record an audit event at the end of each successful call. The events, their ids, and how they are recorded are listed in [Audit events](/docs/developers/audit-events.md).

## See also

- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Log files, levels, formats, and health checks for operators
- [Audit events](/docs/developers/audit-events.md) - How auditing works and the reference of every event
- [Troubleshooting guide](/docs/troubleshooting.md) - How to use the log files to diagnose runtime issues
