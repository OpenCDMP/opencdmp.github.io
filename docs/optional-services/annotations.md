---
sidebar_position: 2
description: Discover everything about the annotations service
---

# Annotations

The `Annotations Service` is responsible to provide commenting capabilities and communication threads to users, that can be attached to any entity. 

All of the information needed for this functionality is getting handled independently of the main platform, using this service.

## Usages

Users can communicate in threads that attach to the [plan](user-guide/plans/index.md) questions and to the [description](user-guide/descriptions/index.md) questions themselves. There is a `comments` button next to the titles of the questions, which brings up a modal with the threads attached to them when clicked. Here, users can either create new threads or respond to existing ones. Comments can also be flaged as `hidden` which makes them visible only to their authors. When a `visible` comment is created, the other users gets notified. There is also a number attached to the annotation buttons indicating the count of them, if any.

![annotation](/images/annotations/comment.png)

## Mention
In addition to simple comments, users can mention other users on their responses by typing the `@` symbol and then select the user they want to mention from the respective dropdown that pops up.

## Status
A comment can change its `status` at any time. Clicking right from each comment appears a dropdown with all available annotation statuses that system have. If a comment changes status, the other users gets notified.

:::info
The way we create a annotation status is described in detail in the [annotation statuses](admin-guide/system-configuration/annotation-statuses.md) section of the docs.
:::

## Copy link
There is a useful feature where the user can refer to the annotations of a question directly by a link which is generated and copied to his clipboard when he presses the `link` handle at the top right corner of the popup dialog. This link is also present in the notification the users receive.