---
template: post
title: 'Spring : Browsing Oracle AQ (XMLType) using Spring JMS'
slug: /2011/12/spring-browsing-oracle-aq-xmltype-using-spring-jms/
draft: false
date: 2011-12-02T21:56:27.934Z
description: 'A tutorial showing how to browse Oracle AQ (XMLType) using Spring JMS '
category: Spring JMS
tags:
  - Spring JMS
---
A tutorial showing how to browse Oracle AQ (XMLType) using Spring JMS - 

```
<beans ...>
 <bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
  <property name="connectionFactory" ref="oracleAqConnFactory" />
  <property name="defaultDestination" ref="destination" />
 </bean>
</beans>
```

```
package com.sachinhandiekar.oracle.aq;
 
import java.util.Enumeration;
 
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Queue;
import javax.jms.QueueBrowser;
import javax.jms.Session;
 
import oracle.jms.AQjmsAdtMessage;
import oracle.jms.AQjmsQueueBrowser;
import oracle.jms.AQjmsSession;
import oracle.sql.ORADataFactory;
import oracle.xdb.XMLType;
 
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.SessionCallback;
 
public class OracleAQQueueBrowser {
 
 private JmsTemplate jmsTemplate;
 
  public void browseMessages() {
 
  Integer count = (Integer) jmsTemplate.execute(new SessionCallback() {
   public Object doInJms(Session session) throws JMSException {
    int count = 0;
    Queue queue = (Queue) jmsTemplate.getDefaultDestination();
 
    QueueBrowser browser = ((AQjmsSession) session).createBrowser(queue, null, XMLType.getORADataFactory(),
      true);
 
    Enumeration messages = browser.getEnumeration();
 
    while (messages.hasMoreElements()) {
     count++;
     Message message = (Message) messages.nextElement();
     displayMessage(message);
    }
 
     return new Integer(count);
   }
 
   private void displayMessage(Message message) {
    try {
     XMLType xmlMsg = (XMLType) ((AQjmsAdtMessage) message).getAdtPayload();
     System.out.println("Message ==> " + xmlMsg.getStringVal());
     System.out.println();
    }
    catch (Exception e) {
     e.printStackTrace();
    }
   }
  }, true);
 
  System.out.println("Number of Messages : " + count);
 }
 
 public void setJmsTemplate(JmsTemplate jmsTemplate) {
  this.jmsTemplate = jmsTemplate;
 }
}
```