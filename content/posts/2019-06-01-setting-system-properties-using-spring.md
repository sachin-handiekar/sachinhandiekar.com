---
template: post
title: Setting System properties using Spring
slug: /2013/01/setting-system-properties-using-spring/
draft: false
date: 2013-01-07T22:03:49.872Z
description: A code snippet showing setting system properties using Spring
category: Spring
tags:
  - Spring
---
Approach 1 :

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context-3.0.xsd
                           http://www.springframework.org/schema/util
                           http://www.springframework.org/schema/util/spring-util-3.0.xsd">
 
    <!-- enable processing of annotations such as @Autowired and @Configuration -->
    <context:annotation-config/> 
 
 
    <bean class="org.springframework.beans.factory.config.MethodInvokingFactoryBean">
        <property name="targetObject">
            <bean class="org.springframework.beans.factory.config.MethodInvokingFactoryBean">
                <property name="targetClass" value="java.lang.System" />
                <property name="targetMethod" value="getProperties" />
            </bean>
        </property>
        <property name="targetMethod" value="putAll" />
        <property name="arguments">
            <util:properties>
                <prop key="test.key">test.value</prop>
            </util:properties>
        </property>
    </bean>
 
</beans>
```

Approach 2 : Suggested by Sam Mohamed

```
	@Bean
	public Properties retrieveSystemProperties() {
		return System.getProperties();
	}

	private Properties systemProperties;

	public Properties getSystemProperties() {
		return systemProperties;
	}

	@Resource(name = "retrieveSystemProperties")
	public void setSystemProperties(Properties systemProperties) {
		this.systemProperties = systemProperties;
	}

	@Bean
	public MethodInvokingFactoryBean methodInvokingFactoryBean() {
		MethodInvokingFactoryBean methodInvokingFactoryBean = new MethodInvokingFactoryBean();
		methodInvokingFactoryBean.setStaticMethod("java.lang.System.setProperties");
		systemProperties.setProperty("http.keepAlive", "false");
		methodInvokingFactoryBean.setArguments(new Object[] { systemProperties });
		return methodInvokingFactoryBean;
	}

```
