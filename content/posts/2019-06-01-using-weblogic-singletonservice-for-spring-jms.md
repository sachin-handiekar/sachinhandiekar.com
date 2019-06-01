---
template: post
title: Using Weblogic SingletonService for Spring JMS
slug: /2011/12/using-weblogic-singletonservice-for-spring-jms/
draft: false
date: 2011-12-22T21:55:39.699Z
description: A tutorial showing the use of Weblogic SingletonService - Spring JMS
category: Weblogic
tags:
  - Weblogic
---
* Weblogic Configuration
— Add screenshots here

* Enterprise Application

Initializing the Spring context inside the SingletonService entry point.

import java.util.Date;
 
import javax.sql.DataSource;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import weblogic.cluster.singleton.SingletonService;
 
public class SingletonServiceEntryPoint implements SingletonService {
 
    private ApplicationContext context;
 
    private static final String CLASS_NAME = SingletonServiceEntryPoint.class.getName();
 
    public void activate() {
        context = new ClassPathXmlApplicationContext("classpath:com/sachinhandiekar/config/beans.xml");
        System.out.println("Context Started At : " + new Date(context.getStartupDate()).toString());
 
        DataSource ds = (DataSource) context.getBean("dataSource");
        System.out.println("Class : " + ds.getClass().getName());
 
        System.out.println(CLASS_NAME + " class activated()");
    }
 
    public void deactivate() {
 
        ((ClassPathXmlApplicationContext) context).close();
        System.out.println(CLASS_NAME + " class deactivated()");
 
    }
}

Sample Application  - https://github.com/sachin-handiekar/weblogic-singleton-service
