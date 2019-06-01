---
template: post
title: Injecting OSGi Service Registry in Spring Context
slug: /2013/08/injecting-osgi-service-registry-in-spring-context/
draft: false
date: 2013-08-24T20:47:23.944Z
description: A tutorial showing injecting OSGi Service Registry in Spring Context
category: jBoss Fuse
---
Introduction

In this example we will inject a OSGi service registry inside a Spring Context.

OSGi Service Registry

Let’s assume we got a Oracle datasource in our OSGi container with the following service description. (Please see this link)

```
<service interface="javax.sql.DataSource" ref="dataSource">
 <service-properties>
  <entry key="osgi.jndi.service.name" value="jdbc/oracleds"/>
  <entry key="datasource.name" value="OracleDS"/>
 </service-properties>
</service>
```

Spring Configuration

1. Add the OSGi namespace in your Spring context.
```
<beans xmlns=http://www.springframework.org/schema/beans" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:osgi=http://www.springframework.org/schema/osgi" 
xsi:schemaLocation="
http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd 
http://www.springframework.org/schema/osgi 
http://www.springframework.org/schema/osgi/spring-osgi.xsd"> 
```

2. Using the osgi:reference to get the datasource object.
```
<osgi:reference id="dataSource"  interface="javax.sql.DataSource" filter="(osgi.jndi.service.name=jdbc/oracleds)"  /> 

```
