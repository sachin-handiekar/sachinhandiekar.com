---
template: post
title: Logging Gatein WSRP SOAP Messages
slug: /2015/03/logging-gatein-wsrp-soap-messages/
draft: true
date: 2015-03-19T21:18:04.509Z
description: A tutorial showing how to enable logging to Gatein WSRP SOAP Messages
category: jBoss Portal
---
In standalone.xml, add the following system property,

```
<property name="org.apache.cxf.logging.enabled" value="true"/>
```
Also add the following valve settings in 'urn:jboss:domain:web:1.4'
```
 <subsystem xmlns="urn:jboss:domain:web:1.4" default-virtual-server="default-host" native="false">
    ...
	...
   <valve name="RequestLogging" module="org.jboss.as.web" class-name="org.apache.catalina.valves.RequestDumperValve"/>
</subsystem>
```
