---
template: post
title: Setting SOAP Headers in Apache CXF – Client
slug: /2014/02/setting-soap-headers-in-apache-cxf-client/
draft: false
date: 2014-02-17T21:41:54.396Z
description: A tutorial showing adding SOAP Headers in Apache CXF - Client
category: Apache CXF
tags:
  - Apache CXF
---
Adding SOAP headers using Apache CXF – Client

```
ClientProxyFactoryBean factory = new JaxWsProxyFactoryBean();
factory.setServiceClass(SampleService.class);
 
// Set the web service endpoint URL here
factory.setAddress("http://localhost:8181/cxf/sampleService/");
 
SampleService serviceClient = (SampleService) factory.create();
 
// Get the underlying Client object from the proxy object of service interface
Client proxy = ClientProxy.getClient(serviceClient);
 
// Creating SOAP headers to the web service request
 
// Create a list for holding all SOAP headers
List<Header> headersList = new ArrayList<Header>();
 
Header userNameHeader = new Header(new QName("http://sachinhandiekar.com/ws/SampleWS", "userName"), "JohnDoe", new JAXBDataBinding(String.class));
 
headersList.add(userNameHeader);
 
// Add SOAP headers to the web service request
proxy.getRequestContext().put(Header.HEADER_LIST, headersList);
      
 
serviceClient.processData();
```
