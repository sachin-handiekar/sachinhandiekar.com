---
template: post
title: Using External Properties in Apache Karaf (Fuse ESB)
slug: /2013/08/using-external-properties-in-apache-karaf-fuse-esb/
draft: false
date: 2013-08-24T20:45:34.666Z
description: A tutorial showing using external properties in Apache Karaf/jBoss Fuse
category: jBoss Fuse
tags:
  - jBoss Fuse
---
Introduction
In this example we will see how to use an external property file in Fuse ESB / Apache Karaf.

Creating a configuration file
Create a config file named sample.cfg in FUSE_HOME/etc with the following content.

```
#
# ActiveMQ properties
#
activemq.url=tcp://localhost:61616
activemq.username=admin
activemq.password=admin
 
#
# Oracle Datasource properties
#
db.url=jdbc:oracle:thin:@localhost:1521/service
db.username=admin
db.password=admin
 
#
# jBoss EAP
#
eap.base.url=http://localhost:8080
```

Spring Configuration
```
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:ctx="http://www.springframework.org/schema/context"
       xmlns:osgi="http://camel.apache.org/schema/osgi"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:osgix="http://www.springframework.org/schema/osgi-compendium"
       ... >
  
<!-- Getting the properties file from OSGi -->
<osgix:cm-properties id="preProps" persistent-id="sample" />   
   
<!-- Injecting the properties file in Spring Container -->
<ctx:property-placeholder properties-ref="preProps" />
  
<bean id="amqConnectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory"
        p:brokerURL="${activemq.url}"
        p:userName="${activemq.username}"
        p:password="${activemq.password}" />
  
</beans>
```

Blueprint 

```
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
           xmlns:cm="http://aries.apache.org/blueprint/xmlns/blueprint-cm/v1.0.0">
    <cm:property-placeholder persistent-id="sample" />   
   
    <bean id="dataSource" class="oracle.jdbc.pool.OracleDataSource">
        <property name="URL" value="${db.url}"/>
        <property name="user" value="${db.username}"/>
        <property name="password" value="${db.password}"/>
    </bean> 
    <service interface="javax.sql.DataSource" ref="dataSource">
        <service-properties>
            <entry key="osgi.jndi.service.name" value="jdbc/oracleds"/>
            <entry key="datasource.name" value="OracleDS"/>
        </service-properties>
    </service>
</blueprint>
```


Note : The default blueprint placeholder syntax (accessing the blueprint properties directly) is ${Key}. Hence, outside the scope of a camelContext element, the placeholder syntax you must use is ${Key}. Whereas, inside the scope of a camelContext element, the placeholder syntax you must use is {{Key}}.

Camel Route

```
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:ctx="http://www.springframework.org/schema/context"
       xmlns:osgi="http://camel.apache.org/schema/osgi"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:osgix="http://www.springframework.org/schema/osgi-compendium"
       ... >
   
<!-- Getting the properties file from OSGi -->
<osgix:cm-properties id="extProps" persistent-id="sample" />
  
  
<camelContext xmlns="http://camel.apache.org/schema/spring">
    <propertyPlaceholder id="myProps" location="ref:extProps" />
          
    <route>
        <from uri="activemq:queue:startProcess" />
        <log loggingLevel="INFO" message="${body}" />
    </route>
</camelContext>
  
</beans>
```
