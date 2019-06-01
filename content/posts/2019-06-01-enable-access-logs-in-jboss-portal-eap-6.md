---
template: post
title: Enable Access Logs in jBoss Portal / EAP 6
slug: /2015/09/enable-access-logs-in-jboss-portal-eap-6/
draft: false
date: 2015-09-30T20:05:34.630Z
description: A tutorial showing how to enable access log in jBoss Portal/EAP 6
category: jBoss Portal
tags:
  - jBoss Portal
---
In jBoss Portal 6.1 / jBoss EAP 6, the access logs can be enabled by adding <access-log> element inside the virtual-server (web subsystem) in standalone.xml

```
<subsystem xmlns="urn:jboss:domain:web:1.2" default-virtual-server="default-host" native="false">
   <connector name="http" protocol="HTTP/1.1" scheme="http" socket-binding="http" />
   <virtual-server name="default-host" enable-welcome-root="true">
      <alias name="localhost" />
      <alias name="example.com" />
      <access-log pattern="%h %l %u %t %r %s %b %{Referer}i %{User-Agent}i %S %T" prefix="access_log_" />
   </virtual-server>
</subsystem>
```

Using CLI
```
/subsystem=web/virtual-server=default-host/access-log=configuration:add
/subsystem=web/virtual-server=default-host/access-log=configuration:write-attribute(name="pattern",value="%h %l %u %t \\"%r\\" %s %b %S %T")
:reload
```

Ref : https://access.redhat.com/solutions/185383
