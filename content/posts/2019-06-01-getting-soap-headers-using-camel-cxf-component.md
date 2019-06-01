---
template: post
title: Getting SOAP Headers using Camel CXF component
slug: /2014/02/getting-soap-headers-using-camel-cxf-component/
draft: false
date: 2014-02-11T21:40:28.436Z
description: A tutorial showing getting SOAP Headers using the Camel-CXF Component
category: Apache Camel
tags:
  - Apache Camel
---
Getting SOAP headers using Camel CXF component.

Camel Route : 
```
import org.apache.camel.builder.RouteBuilder;
 
public class SampleRoute extends RouteBuilder {
 
    @Override
    public void configure() throws Exception {
        from("cxf:bean:sampleService")
                .to("bean:sampleProcessor?method=processData")
                .log("${body}");
    }
}

```

Processor :
```
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
 
 
import org.w3c.dom.Element;
 
import org.apache.camel.Exchange;
import org.apache.camel.Header;
import org.apache.cxf.binding.soap.SoapHeader;
 
 
public class CustomProcessor {
 
    public void processData(
            @Header("org.apache.cxf.headers.Header.list") List<SoapHeader> soapHeaders,
            Exchange exchange) {       
 
        // Print SOAP Headers
        for (SoapHeader soapHeader : soapHeaders) {
            System.out.println(soapHeader.getName().getLocalPart() + "  : "
                             + ((Element)soapHeader.getObject()).getTextContent());
        }
 
    }
}
```
