title: Oracle Datasource in Fuse ESB / Apache Karaf
link: http://sachinhandiekar.com/2013/08/oracle-datasource-in-fuse-esb-apache-karaf/
author: handiekar
description: 
post_id: 34
created: 2013/08/02 12:16:00
created_gmt: 2013/08/02 11:16:00
comment_status: open
post_name: oracle-datasource-in-fuse-esb-apache-karaf
status: publish
post_type: post

# Oracle Datasource in Fuse ESB / Apache Karaf



## Comments

**[Valery D](#22 "2016-03-02 12:22:33"):** Optionally, you can add configure a pool of connections  
  
<?xml version="1.0" encoding="UTF-8"?>  
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0">  
  
<bean id="dataSource" class="oracle.jdbc.pool.OracleDataSource">  
<property name="URL" value="jdbc:oracle:thin:@[hostname

