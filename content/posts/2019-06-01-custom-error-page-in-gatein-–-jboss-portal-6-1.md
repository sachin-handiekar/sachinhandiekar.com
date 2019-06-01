---
template: post
title: Custom Error page in Gatein – jBoss Portal 6.1
slug: /2015/06/custom-error-page-in-gatein-jboss-portal-6-1/
draft: false
date: 2015-06-17T20:13:23.535Z
description: >-
  A tutorial showing how to create custom error page in Gatein - jBoss Portal
  6.1
category: jBoss Portal
---
Steps to add a custom error page in GateIn (jBoss Portal 6.1)
1. Create the error pages and place them in the 
```
$JPP_HOME/gatein/gatein.ear/portal.war/error/ directory.
```

For each error code that shall have its custom error page, add the element to the $JPP_HOME/gatein/gatein.ear/portal.war/WEB-INF/web.xml file. This element specifies what page is displayed when the particular error code is returned. 

The sample code below ensures that the 404.html page is displayed when the 404 error code is returned.

```
<error-page>
  <error-code>404</error-code>
  <location>/error/404.html</location>
</error-page>
```

Specify the error page locations as static resources in the controller.xml file. The code sample below demonstrates this configuration for the /404.html path. The file is located at $JBOSS_PORTAL/standalone/configuration/gatein/ folder.

```
<route path="/error/404.html">
  <route-param qname="gtn:handler">
    <value>staticResource</value>
  </route-param>
</route>
```

Without this configuration, the portal tries to resolve /404.html as a name of a portal or another resource. It is therefore necessary to configure the error page locations as static resources. 
3. Add the Custom Portlet Request Handler in GateIn. (Ref:https://access.redhat.com/solutions/47434)

Build the project available at – https://github.com/martinweiler/CustomPortalRequestHandler and copy the jar to
$JPP_HOME/modules/system/layers/gatein/org/gatein/lib/main

Edit the $JPP_HOME/modules/system/layers/gatein/org/gatein/lib/main/module.xml, and add the following to the end of element:

```
<resource-root path="portal-request-handler.jar">
```


Edit $JPP_HOME/gatein/gatein.ear/portal.war/WEB-INF/conf/portal/controller-configuration.xml, and apply the following change:

```
<component-plugin>
 <name>PortalRequestHandler</name>
  <set-method>register</set-method>
  <!-- Disable the default handler
   <type>org.exoplatform.portal.application.PortalRequestHandler</type>
  -->
   <type>org.exoplatform.portal.application.CustomPortalRequestHandler</type>
</component-plugin>
```


4. Browse to any invalid link in jBoss Portal – http://localhost:8080/portal/invalid-link and see the custom error page. 

Note: To have a custom error page on the root (/) domain. Create a war file with the following web.xml or use the project –
https://github.com/sachin-handiekar/jboss-utils/error/
