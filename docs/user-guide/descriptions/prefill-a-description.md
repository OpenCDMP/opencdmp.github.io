---
sidebar_position: 5
description: Discover how to prefill a description to save time
---

# Prefill a Description

There is a way to prefill some basic information on your description during its creation. When you add a description on a plan, you get greeted by a modal where you can select if you want to use a [prefilling source](admin-guide/system-configuration/prefilling-sources.md) or you want to fill all the questions manually. If you choose to prefill, then you will have to choose the [description template](admin-guide/content-management/templates/index.md) you want to use and the prefilling source.

:::note
Prefill a description is available only if blueprint supports this option. More details about blueprints [here](user-guide/blueprints.md).
:::

## How does it work?

The fields of the questions on a description template can have [semantics](admin-guide/content-management/templates/semantics.md) attached. These semantics are then used to fetch the relevant information from the source of your choice and prefill these fields for you.