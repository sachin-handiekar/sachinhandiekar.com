---
template: post
title: Custom Invocation Handler for Gatein WSRP
slug: /2015/03/custom-invocation-handler-for-gatein-wsrp/
draft: false
date: 2015-03-03T21:14:46.401Z
description: A tutorial showing creating custom Invocation Handler for Gatein WSRP
category: jBoss Portal
tags:
  - Gatein
  - jBoss Portal
---
We’ll be creating a custom invocation handler for WSRP using the Gatein WSRP Extension. For this example code we’ll be sending two custom attributes (CustomerID & OrderID) from our consumer to the producer.

Source code available at Github - https://github.com/sachin-handiekar/gatein-wsrp-examples

Consumer

```
package com.sachinhandiekar.examples.gatein.wsrp;

import org.gatein.pc.api.invocation.PortletInvocation;
import org.gatein.pc.api.invocation.RenderInvocation;
import org.gatein.pc.api.invocation.ActionInvocation;

import org.gatein.pc.api.invocation.response.PortletInvocationResponse;
import org.gatein.wsrp.api.extensions.ConsumerExtensionAccessor;
import org.gatein.wsrp.api.extensions.ExtensionAccess;
import org.gatein.wsrp.api.extensions.InvocationHandlerDelegate;
import org.oasis.wsrp.v2.MarkupParams;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import java.util.logging.Logger;

/**
 * @author Sachin Handiekar
 */
public class CustomConsumerInvocationHandlerDelegate extends InvocationHandlerDelegate {

    private static final Logger logger = Logger.getLogger(CustomConsumerInvocationHandlerDelegate.class.getName());
    public static final String CUSTOMER_ID = "CustomerId";
    public static final String ORDER_ID = "OrderId";
    public static final String EXTENSION = "Extension";

    @Override
    public void processInvocation(PortletInvocation invocation) {

        if ((invocation instanceof RenderInvocation) || (invocation instanceof ActionInvocation)) {

            logger.info("CustomConsumerInvocationHandlerDelegate invoked!!!!");

            // retrieve the session id from the portlet invocation
            final String id = invocation.getRequest().getSession().getId();
            logger.info("Session id: " + id);


            // Create an element named 'Extension'
            final Element markupParamsExtension = DOMUtils.createElement(EXTENSION);

            String customerId = invocation.getRequest().getParameter(CUSTOMER_ID);

            if (customerId != null) {
                // Create a child-element named 'CustomerId'
                createChildElement(markupParamsExtension, CUSTOMER_ID, customerId);
            }


            String orderId = invocation.getRequest().getParameter(ORDER_ID);

            if (orderId != null) {
                // Create a child-element named 'OrderId'
                createChildElement(markupParamsExtension, ORDER_ID, orderId);
            }

            // retrieve the ConsumerExtensionAccessor
            final ConsumerExtensionAccessor consumerExtensionAccessor = ExtensionAccess.getConsumerExtensionAccessor();

            // attach the newly created extension to the MarkupParams element for this particular invocation
            consumerExtensionAccessor.addRequestExtension(MarkupParams.class, markupParamsExtension);
        }
    }


    private void createChildElement(Element parentElement, String childElementName, String childElementValue) {
        final Node dummyData = DOMUtils.addChild(parentElement, childElementName);
        dummyData.setTextContent(childElementValue);
    }


    @Override
    public void processInvocationResponse(PortletInvocationResponse response, PortletInvocation invocation) {
        // do nothing
    }


}
```


Producer

```
package com.sachinhandiekar.examples.gatein.wsrp;

import org.gatein.pc.api.invocation.PortletInvocation;
import org.gatein.pc.api.invocation.RenderInvocation;
import org.gatein.pc.api.invocation.ActionInvocation;
import org.gatein.pc.api.invocation.response.PortletInvocationResponse;
import org.gatein.wsrp.api.extensions.ExtensionAccess;
import org.gatein.wsrp.api.extensions.InvocationHandlerDelegate;
import org.gatein.wsrp.api.extensions.UnmarshalledExtension;
import org.oasis.wsrp.v2.MarkupParams;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.logging.Logger;

/**
 * @author Sachin Handiekar
 */
public class CustomProducerInvocationHandlerDelegate extends InvocationHandlerDelegate {

    private static final Logger logger = Logger.getLogger(CustomProducerInvocationHandlerDelegate.class.getName());

    @Override
    public void processInvocation(PortletInvocation invocation) {
            if ((invocation instanceof RenderInvocation) || (invocation instanceof ActionInvocation)) {

            final List<UnmarshalledExtension> requestExtensions = ExtensionAccess.getProducerExtensionAccessor().getRequestExtensionsFor(MarkupParams.class);

            if (!requestExtensions.isEmpty()) {

                final UnmarshalledExtension unmarshalledExtension = requestExtensions.get(0);

                if (unmarshalledExtension.isElement()) {

                    final Element element = (Element) unmarshalledExtension.getValue();

                    NodeList nodeList = element.getChildNodes();

                    for (int i = 0; i < nodeList.getLength(); i++) {
                        Node node = nodeList.item(i);
                        if (node.getNodeType() == Node.ELEMENT_NODE) {

                            String nodeKey = node.getNodeName();
                            String nodeValue = node.getTextContent();

                            logger.info("Node Key : " + nodeKey);
                            logger.info("Node  Value: " + nodeValue);

                            // Get the HttpServletRequest
                            HttpServletRequest httpServletRequest = invocation.getRequest();

                            // Set the attributes here
                            httpServletRequest.setAttribute(nodeKey, nodeValue);

                        }
                    }
                }
            }
        }
    }

    @Override
    public void processInvocationResponse(PortletInvocationResponse response, PortletInvocation invocation) {
        // Do nothing
    }
}
```


Utility class

```
package com.sachinhandiekar.examples.gatein.wsrp;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

/**
 * @author Sachin Handiekar
 */
public class DOMUtils {
    public static Element createElement(String name) {

        DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
        builderFactory.setNamespaceAware(true);
        try {
            final DocumentBuilder builder = builderFactory.newDocumentBuilder();
            final Document document = builder.newDocument();

            return document.createElement(name);
        } catch (ParserConfigurationException e) {
            throw new RuntimeException("Couldn't get a DocumentBuilder", e);
        }
    }

    public static Node addChild(Node parent, String childName) {
        final Element child = parent.getOwnerDocument().createElement(childName);
        return parent.appendChild(child);
    }
}
```

Deployment

Deploying the custom invocation handler delegate in Consumer & producer side.

Build the project and copy the jar file in %JBOSS_PORTAL%/gatein/extensions

Consumer

standalone.bat -Dorg.gatein.wsrp.consumer.handlers.delegate=com.sachinhandiekar.examples.gatein.wsrp.CustomConsumerInvocationHandlerDelegate

Producer

standalone.bat -Dorg.gatein.wsrp.producer.handlers.delegate=com.sachinhandiekar.examples.gatein.wsrp.CustomProducerInvocationHandlerDelegate
