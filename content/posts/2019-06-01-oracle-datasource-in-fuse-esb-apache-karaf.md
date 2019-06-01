---
template: post
title: Oracle Datasource in Fuse ESB / Apache Karaf
slug: /2013/08/oracle-datasource-in-fuse-esb-apache-karaf/
draft: false
date: 2013-08-14T20:49:26.652Z
description: A tutorial showing using Oracle Datasource in Fuse ESB / Apache Karaf.
category: jBoss Fuse
tags:
  - jBoss Fuse
---
Creating a Oracle data-source in Fuse ESB [Apache Karaf]

1. Create a blueprint xml file as shown below –

datasource-oracle.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0">
 
  <bean id="dataSource" class="oracle.jdbc.pool.OracleDataSource">
      <property name="URL" value="jdbc:oracle:thin:@[hostname]:[port]/[service-name]"/>
      <property name="user" value="username"/>
      <property name="password" value="password"/>
  </bean>  
   
 <service interface="javax.sql.DataSource" ref="dataSource">
  <service-properties>
   <entry key="osgi.jndi.service.name" value="jdbc/oracleds"/>
   <entry key="datasource.name" value="OracleDS"/>
  </service-properties>
 </service>
</blueprint>
```

2. Installing the Oracle Driver in Karaf console
```
install -s wrap:mvn:com.oracle/ojdbc6/11.2.0
```
Note: Please make sure you’ve got the Oracle Driver in your local/remote maven repository. If you don’t have it please install with the following maven command –
```
mvn install:install-file -Dfile=ojdbc6.jar -DgroupId=com.oracle 
    -DartifactId=ojdbc6 -Dversion=11.2.0 -Dpackaging=jar
```
2. Deploy it on the Fuse ESB server

Copy the datasource-oracle.xml in the FUSE ESB deploy folder ( e.g. %FUSE_SERVER%/deploy )

