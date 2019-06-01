---
template: post
title: 'Oracle AQ : Enqueue and Dequeue XMLType Message (PL/SQL)'
slug: /2011/10/oracle-aq-enqueue-and-dequeue-xmltype-message-plsql/
draft: false
date: 2011-09-13T21:01:44.787Z
description: A code snippet to enqueue/dequeue XMLType Message using PL/SQL
category: Oracle AQ
tags:
  - Oracle AQ
---
* Enqueue

```
DECLARE
  
  queue_options DBMS_AQ.ENQUEUE_OPTIONS_T; 
  message_properties DBMS_AQ.MESSAGE_PROPERTIES_T; 
  message_id RAW(16); 
  message SYS.XMLType; 
  
BEGIN
  
  message := sys.XMLType.createXML('<sample>hello world</sample>');
  DBMS_AQ.ENQUEUE( queue_name => 'q_sample', 
                   enqueue_options => queue_options, 
                   message_properties => message_properties, 
                   payload => message, 
                   msgid => message_id); 
  
  COMMIT;
END;
```


* Dequeue

```
SET serveroutput ON format word_wrapped;
 
DECLARE
  queue_options DBMS_AQ.DEQUEUE_OPTIONS_T;
  message_properties DBMS_AQ.MESSAGE_PROPERTIES_T;
  message_id RAW(16);
  MESSAGE SYS.XMLType;
  no_messages EXCEPTION;
  PRAGMA EXCEPTION_INIT (no_messages, -25228); 
BEGIN
  queue_options.wait := 1;
  DBMS_AQ.dequeue(queue_name => 'q_sample', 
                  dequeue_options => queue_options,
                  message_properties => message_properties, 
                  payload => MESSAGE, 
                  msgid =>  message_id);
  COMMIT;
  DBMS_OUTPUT.put_line('XML Payload : ' || message.getStringVal());
  EXCEPTION 
      WHEN no_messages THEN
        DBMS_OUTPUT.put_line (' ---- NO MORE MESSAGES  ---- ');         
    
END;

```
