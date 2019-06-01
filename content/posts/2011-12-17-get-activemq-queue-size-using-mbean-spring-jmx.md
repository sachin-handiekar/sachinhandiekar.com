title: Get ActiveMQ Queue Size using MBean (Spring JMX)
link: http://sachinhandiekar.com/2011/12/get-activemq-queue-size-using-mbean-spring-jmx/
author: handiekar
description: 
post_id: 36
created: 2011/12/17 18:52:00
created_gmt: 2011/12/17 18:52:00
comment_status: open
post_name: get-activemq-queue-size-using-mbean-spring-jmx
status: publish
post_type: post

# Get ActiveMQ Queue Size using MBean (Spring JMX)



## Comments

**[liminescence](#2 "2012-03-01 22:06:21"):** Hi Sachin. Thanks for the posting. I tried it your code, but getting some exception connecting to the broker.   
  
I was wondering if you do some configuration, other that adding useJmx="true" in your activemq.xml file.  
  
I have this config:  
  
<broker xmlns="http://activemq.apache.org/schema/core" useJmx="true" brokerName="localhost"   
  
  
Thanks!

**[Sachin Handiekar](#3 "2012-03-07 11:01:55"):** There was no change except the useJmx="true" setting.  
  
Can you post the exception you'r getting...

**[Poyan Gerami](#8 "2013-11-19 14:20:24"):** I get java.net.ConnectException: Connection refused , any settings I need for authentication ?

**[Mehmet Kirazoglu](#15 "2015-01-06 15:06:10"):** Have to set VM arguments as below in order to connect JMX, you may state this as well:  
  
-Dcom.sun.management.jmxremote  
-Dcom.sun.management.jmxremote.port=1099  
-Dcom.sun.management.jmxremote.local.only=false  
-Dcom.sun.management.jmxremote.authenticate=false  
-Djava.rmi.server.hostname=localhost  
-Dcom.sun.management.jmxremote.ssl=false

