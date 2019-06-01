---
template: post
title: 'Using Spring JMS with Oracle AQ [XMLType payload]'
slug: /2011/11/using-spring-jms-with-oracle-aq-xmltype-payload/
draft: false
date: 2011-11-17T21:59:10.419Z
description: A code tutorial showing using Spring JMS with Oracle AQ (XMLType payload)
category: Spring JMS
---
Using Spring JMS with Oracle AQ [ Without Spring JDBC Extension ]

Code available at https://github.com/sachin-handiekar/spring-jms-oracle-aq

Create a queue table with XMLType payload
```
BEGIN
   DBMS_AQADM.CREATE_QUEUE_TABLE( 
                           Queue_table => 'QT_SAMPLE', 
                           Queue_payload_type => 'SYS.XMLTYPE', 
                           Sort_list => 'ENQ_TIME', 
                           COMMENT => 'A sample queue table');
END;

```

* Create a queue

```
BEGIN 
   DBMS_AQADM.CREATE_QUEUE( 
                          Queue_name => 'Q_SAMPLE', 
                          Queue_table => 'QT_SAMPLE', 
                          Queue_type => 0, 
                          Max_retries => 5, 
                          Retry_delay => 10);
END;
```


Code 
AQ Connection factory

```
package com.sachinhandiekar.oracle.aq;
 
import javax.jms.ConnectionFactory;
import javax.sql.DataSource;
 
public class OracleAQQueueConnectionFactory {
 
 private DataSource dataSource;
 
 public ConnectionFactory createConnectionFactory() throws Exception {
  return oracle.jms.AQjmsFactory.getQueueConnectionFactory(dataSource);
 }
 
 public void setDataSource(DataSource dataSource) {
  this.dataSource = dataSource;
 }
 
}
```


AQ Destination Factory

```
package com.sachinhandiekar.oracle.aq;
 
import org.springframework.beans.factory.FactoryBean;
import oracle.jms.AQjmsSession;
 
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.Session;
 
public class OracleAQQueueDestinationFactory implements FactoryBean<queue> {
 
 private QueueConnectionFactory connectionFactory;
 
 private String queueUser;
 
 private String queueName;
 
 public Queue getObject() throws Exception {
  QueueConnection queueConnection = connectionFactory.createQueueConnection();
  AQjmsSession session = (AQjmsSession) queueConnection.createQueueSession(true, Session.SESSION_TRANSACTED);
 
  return session.getQueue(queueUser, queueName);
 }
 
  public Class<queue> getObjectType() {
  return javax.jms.Queue.class;
 }
 
 public boolean isSingleton() {
  return false;
 }
 
 public void setConnectionFactory(QueueConnectionFactory connectionFactory) {
  this.connectionFactory = connectionFactory;
 }
 
 public void setQueueUser(String queueUser) {
  this.queueUser = queueUser;
 }
 
 public void setQueueName(String queueName) {
  this.queueName = queueName;
 }
}
```



Message Listener for XMLType message

```
package com.sachinhandiekar.oracle.aq;
 
import javax.jms.Message;
import javax.jms.MessageListener;
 
import org.springframework.transaction.annotation.Transactional;
 
import oracle.jms.AQjmsAdtMessage;
import oracle.xdb.XMLType;
 
public class OracleMessageListener implements MessageListener {
 
 @Transactional
 public void onMessage(Message message) {
 
  try {
 
   //Converting message into XmlType payload
   XMLType xmlMsg = (XMLType) ((AQjmsAdtMessage) message).getAdtPayload();
 
   System.out.println("XML Payload ==> " + xmlMsg.getStringVal());
 
  }
  catch (Exception e) {
   // Catch any exception here
   e.printStackTrace();
  }
 
 }
 
}
```



Message Listener Container

```
package com.sachinhandiekar.oracle.aq;
 
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Session;
 
import oracle.jms.AQjmsSession;
import oracle.xdb.XMLType;
 
import org.springframework.jms.listener.DefaultMessageListenerContainer;
 
public class OracleXMLMessageListenerContainer extends DefaultMessageListenerContainer {
 
 protected MessageConsumer createConsumer(Session session, Destination destination) throws JMSException {
  return ((AQjmsSession) session).createConsumer(destination, null, XMLType.getORADataFactory(), null, false);
 }
 
}
```



Sending XML Message to the queue

```
package com.sachinhandiekar.oracle.aq;
 
import java.sql.Connection;
import java.sql.SQLException;
 
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.sql.DataSource;
 
import oracle.jms.AQjmsSession;
import oracle.xdb.XMLType;
 
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
 
public class Main {
 public static void main(String[] args) {
  ApplicationContext ctx = new ClassPathXmlApplicationContext("beans.xml");
 
  JmsTemplate jmsTemplate = (JmsTemplate) ctx.getBean("jmsTemplate");
 
  final DataSource dataSource = (DataSource) ctx.getBean("dataSource");
 
  final String xmlMessage = "<sample>hello aq test 2</sample>";
 
  jmsTemplate.send("q_sample", new MessageCreator() {
   public Message createMessage(Session session) throws JMSException {
 
    Connection conn = null;
    XMLType payload = null;
    try {
     conn = dataSource.getConnection();
     payload = XMLType.createXML(conn, xmlMessage);
    }
    catch (SQLException e) {
     e.printStackTrace();
    }
    finally {
     try {
      conn.close();
     }
     catch (SQLException e) {
      // ignore it
     }
    }
 
    Message msg = ((AQjmsSession) session).createORAMessage(payload);
 
    return msg;
   }
  });
 
  System.out.println("Message Sent!!!");
 
 }
}

```
