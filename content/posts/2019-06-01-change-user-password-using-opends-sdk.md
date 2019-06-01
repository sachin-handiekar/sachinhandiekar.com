---
template: post
title: Change User password using OpenDS SDK
slug: /2014/08/change-user-password-using-opends-sdk/
draft: false
date: 2014-08-13T20:38:06.485Z
description: A tutorial showing changing user LDAP password using OpenDS SDK
category: OpenDS
tags:
  - OpenDS
---
Changing User’s Password using OpenDS SDK.

```
import org.opends.sdk.Connection;
import org.opends.sdk.ConnectionFactory;
import org.opends.sdk.Connections;
import org.opends.sdk.LDAPConnectionFactory;
import org.opends.sdk.LDAPOptions;
import org.opends.sdk.requests.BindRequest;
import org.opends.sdk.requests.PasswordModifyExtendedRequest;
import org.opends.sdk.requests.Requests;
import org.opends.sdk.responses.PasswordModifyExtendedResult;
 
/**
 * @author Sachin Handiekar
 */
public class LDAPChangePassword {
 
 public static void main(String[] args) throws Exception {
 
  final String hostName = "<<<HOSTNAME>>";
  final int port = 2389;
  final String bindUserName = "<< BIND USERNAME >>"; // BIND USER NAME (for ex. cn=adminstrator )
  final String password = "<< PASSWORD >>";
 
  LDAPOptions options = new LDAPOptions();
 
  ConnectionFactory connFactory = new LDAPConnectionFactory(hostName, port, options);
 
                // Simple Bind Request
  BindRequest bindRequest = Requests.newSimpleBindRequest(bindUserName, password.toCharArray());
   
   
  if (bindRequest != null) {
   connFactory = Connections.newAuthenticatedConnectionFactory(connFactory, bindRequest);
  }
 
  Connection connection = connFactory.getConnection();
   
  System.out.println("Got a Connection : " + connection);   
 
  final String USER_CN_PATH = ",cn=Users,dc=sample,dc=com";  
  String userName = "JohnDoe";
  String userIdentity = "cn="+  userName + USER_CN_PATH;
   
   
  String newPassword = "NewPassword";
 
  // Password Modify Request
  PasswordModifyExtendedRequest passwordModifyRequest = Requests.newPasswordModifyExtendedRequest();
 
  passwordModifyRequest.setUserIdentity(userIdentity);
  passwordModifyRequest.setNewPassword(newPassword.toCharArray());
 
  PasswordModifyExtendedResult result = (PasswordModifyExtendedResult) connection.extendedRequest(passwordModifyRequest);
 
  System.out.println("Result Code : " + result.getResultCode());
 
  // Closing the connection
  connection.close();
 
 }
 
}
```
