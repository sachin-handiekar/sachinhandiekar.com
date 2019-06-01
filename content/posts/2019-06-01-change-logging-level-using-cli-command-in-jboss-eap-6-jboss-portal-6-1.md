---
template: post
title: Change logging level using CLI command in JBoss EAP 6 / jBoss Portal 6.1
slug: >-
  /2015/08/change-logging-level-using-cli-command-in-jboss-eap-6-jboss-portal-6-1/
draft: true
date: 2015-08-12T20:08:47.708Z
description: >-
  A tutorial showing changing logging level using CLI command in jBoss EAP /
  Portal 6.1
category: jBoss Portal
tags:
  - jBoss Portal
---
We can change the logging level of a package in jBoss EAP 6 or jBoss Portal 6.1 without restarting the server using the CLI command.
Go to $JBOSS_HOME/bin

Run the following command -
```
 ./jboss-cli.sh --connect controller=localhost:9999
```
Note : If you're using a port offset, the management console port can be calculated as,

port = managementNativeSocket (9999) + port offSet
Standalone Mode
After connecting to the server, we can execute the following operations -

3.1. Print out all the logger packages available.
```
 ls /subsystem=logging/logger 
```
3.2 Print out the details of a package, e.x. logging level, etc
```
 /subsystem=logging/logger=com.sample.project:read-resource
```
3.3 Change log level
```
 /subsystem=logging/logger=com.sample.project:change-log-level(level=DEBUG)
```
3.4 Add a log level

```
/subsystem=logging/logger=package.name/:add(category=package.name,level=INFO,use-parent-handlers=true)
```
