title: Using Spring JMS with Oracle AQ [XMLType payload]
link: http://sachinhandiekar.com/2011/11/using-spring-jms-with-oracle-aq-xmltype-payload/
author: handiekar
description: 
post_id: 51
created: 2011/11/26 14:06:00
created_gmt: 2011/11/26 14:06:00
comment_status: open
post_name: using-spring-jms-with-oracle-aq-xmltype-payload
status: publish
post_type: post

# Using Spring JMS with Oracle AQ [XMLType payload]



## Comments

**[Kleber Pinel Bernardo da Silva](#5 "2013-04-17 19:15:38"):** Hello.  
  
I'm getting the this error:  
  
oracle.jms.AQjmsException: JMS-120: Dequeue failed  
at oracle.jms.AQjmsError.throwEx(AQjmsError.java:315)  
at oracle.jms.AQjmsConsumer.jdbcDequeue(AQjmsConsumer.java:1630)  
at oracle.jms.AQjmsConsumer.receiveFromAQ(AQjmsConsumer.java:1037)  
at oracle.jms.AQjmsConsumer.receiveFromAQ(AQjmsConsumer.java:962)  
at oracle.jms.AQjmsConsumer.receiveFromAQ(AQjmsConsumer.java:940)  
at oracle.jms.AQjmsConsumer.receive(AQjmsConsumer.java:792)  
at org.springframework.jms.listener.AbstractPollingMessageListenerContainer.receiveMessage(AbstractPollingMessageListenerContainer.java:429)  
at org.springframework.jms.listener.AbstractPollingMessageListenerContainer.doReceiveAndExecute(AbstractPollingMessageListenerContainer.java:310)  
at org.springframework.jms.listener.AbstractPollingMessageListenerContainer.receiveAndExecute(AbstractPollingMessageListenerContainer.java:263)  
at org.springframework.jms.listener.DefaultMessageListenerContainer$AsyncMessageListenerInvoker.invokeListener(DefaultMessageListenerContainer.java:1058)  
at org.springframework.jms.listener.DefaultMessageListenerContainer$AsyncMessageListenerInvoker.executeOngoingLoop(DefaultMessageListenerContainer.java:1050)  
at org.springframework.jms.listener.DefaultMessageListenerContainer$AsyncMessageListenerInvoker.run(DefaultMessageListenerContainer.java:947)  
at java.lang.Thread.run(Thread.java:680)  
Caused by: java.sql.SQLException: XMLTypeFactory can only work with OPAQUE  
at oracle.xdb.XMLTypeFactory.create(XMLTypeFactory.java:75)  
at oracle.jms.AQjmsConsumer.jdbcDequeue(AQjmsConsumer.java:1453)  
  
Could you help me ?

