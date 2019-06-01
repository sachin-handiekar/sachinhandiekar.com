title: Setting System properties using Spring
link: http://sachinhandiekar.com/2013/01/setting-system-properties-using-spring/
author: handiekar
description: 
post_id: 35
created: 2013/01/22 15:45:00
created_gmt: 2013/01/22 15:45:00
comment_status: open
post_name: setting-system-properties-using-spring
status: publish
post_type: post

# Setting System properties using Spring



## Comments

**[Sam Mohamed](#6 "2013-05-07 16:28:56"):** Another approach using @Configuration:  
  
  
@Bean  
public Properties retrieveSystemProperties(){  
return System.getProperties();  
}  
  
private Properties systemProperties;  
public Properties getSystemProperties() {  
return systemProperties;  
}  
@Resource(name="retrieveSystemProperties")  
public void setSystemProperties(Properties systemProperties) {  
this.systemProperties = systemProperties;  
}  
  
@Bean   
public MethodInvokingFactoryBean methodInvokingFactoryBean() {   
MethodInvokingFactoryBean methodInvokingFactoryBean = new MethodInvokingFactoryBean();  
methodInvokingFactoryBean.setStaticMethod("java.lang.System.setProperties");   
systemProperties.setProperty("http.keepAlive", "false");  
methodInvokingFactoryBean.setArguments(new Object[

**[congdoan](#10 "2014-02-17 03:27:16"):** Thanks, nice post

