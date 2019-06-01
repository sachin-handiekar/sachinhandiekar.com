title: Accessing Spring in Generic Web Applications
link: http://sachinhandiekar.com/2011/10/accessing-spring-in-generic-web-applications/
author: handiekar
description: 
post_id: 55
created: 2011/10/04 08:39:00
created_gmt: 2011/10/04 07:39:00
comment_status: open
post_name: accessing-spring-in-generic-web-applications
status: publish
post_type: post

# Accessing Spring in Generic Web Applications

A web application can load Spring's application context be registering the servlet listener **ContextLoadListener**. This listener stores the loaded application context into the web application's servlet context. Later, a servlet, or any object that can access the servlet context can access the Spring's application context through the **WebApplicationContextUtils.**getRequiredWebApplicationContext() method. 

  
Code goes here....