---
template: post
title: Get ActiveMQ Queue Size using MBean (Spring JMX)
slug: /2011/12/get-activemq-queue-size-using-mbean-spring-jmx/
draft: false
date: 2011-12-06T21:51:30.207Z
description: A tutorial showing using MBean to get ActiveMQ queue size
category: ActiveMQ
tags:
  - ActiveMQ
---
Getting a queue size of an ActiveMQ queue using MBean (Spring JMX).

Spring Config file

```
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.springframework.org/schema/beans" xsi:schemalocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
 
 <bean class="org.springframework.jmx.support.MBeanServerConnectionFactoryBean" id="mbeanServerConnection">
  <property name="serviceUrl" value="service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi">
 </property></bean>
 
 <bean class="com.sample.QueueSizeCounter" id="queueCounter">
  <property name="mBeanServerConnection" ref="mbeanServerConnection">
 </property></bean>
 
</beans>
```

* A class using the MBeanServerConnection to fetch the attribute from the MBean

```
package com.sample;
 
import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
 
import org.apache.log4j.Logger;
 
public class QueueSizeCounter {
 
 private MBeanServerConnection mBeanServerConnection;
 
 private Logger logger = Logger.getLogger(QueueSizeCounter.class);
 
 public Long getQueueSize(String queueName) {
  Long queueSize = null;
  try {
 
   ObjectName objectNameRequest = new ObjectName(
     "org.apache.activemq:BrokerName=localhost,Type=Queue,Destination=" + queueName);
 
   queueSize = (Long) mBeanServerConnection.getAttribute(objectNameRequest, "QueueSize");
 
   return queueSize;
  }
  catch (Exception e) {
   logger.error(e.getMessage());
  }
  return queueSize;
 }
 
 public void setmBeanServerConnection(MBeanServerConnection mBeanServerConnection) {
  this.mBeanServerConnection = mBeanServerConnection;
 }
 
}
```


* Running the Queue Counter

```
package com.sample;
 
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
 
public class Main {
 
 public static void main(String[] args) {
 
  ApplicationContext ctx = new ClassPathXmlApplicationContext("beans.xml");
   
  QueueSizeCounter queueCounter = (QueueSizeCounter) ctx.getBean("queueCounter");
 
  String queueName = "Queue1";
  long queueSize = queueCounter.getQueueSize(queueName);
 
  System.out.println("Size of " + queueName + " : " + queueSize);
 }
}
```

Note : Try to set the below VM arguments if facing any problem connecting to JMX - 

```
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.port=1099
-Dcom.sun.management.jmxremote.local.only=false
-Dcom.sun.management.jmxremote.authenticate=false
-Djava.rmi.server.hostname=localhost
-Dcom.sun.management.jmxremote.ssl=false
```
