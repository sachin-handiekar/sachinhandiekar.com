---
title: Oracle JDBC Driver
slug: oracle-jdbc-driver
draft: false
date: 2011-09-28T18:54:22.897Z
description: A code snippet for the Oracle JDBC driver
category: JDBC
tags:
  - oracle jdbc
---
```
Driver Class : oracle.jdbc.OracleDriver
Default Port : 1521
URL           jdbc:oracle:thin:@<host>:<port>:<sid>
                  jdbc:oracle:oci:@<host>:<port>:<sid>



Oracle JDBC Thin using a Service Name: 
               jdbc:oracle:thin:@//<host>:<port>/<service_name> 

               Example: jdbc:oracle:thin:@//192.168.2.1:1521/XE





Oracle JDBC Thin using a TNSName: 

             jdbc:oracle:thin:@<TNSName>

             Example: jdbc:oracle:thin:@GL
             Note: Support for TNSNames was added in the driver release 10.2.0.1
```

Note : The Java classes to connect to Oracle are contained in the Oracle JDBC driver jar file. For recent releases, these are numbered based on the Java version they are compiled for, such as ojdbc14.jar (for Java 1.4), ojdbc15.jar (for Java 1.5), etc.
