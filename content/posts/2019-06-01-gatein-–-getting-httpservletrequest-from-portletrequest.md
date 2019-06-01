---
template: post
title: GateIn – Getting HttpServletRequest from PortletRequest
slug: /2015/03/gatein-getting-httpservletrequest-from-portletrequest/
draft: true
date: 2015-03-10T21:18:32.106Z
description: A code snippet showing getting HttpServletRequest from PortletRequest
category: jBoss Portal
tags:
  - jBoss Portal
---
A code snippet showing getting HttpServletRequest from PortletRequest in jBoss Portal

```
/**
 * @author Sachin Handiekar
 **/
final class Util {
	static final HttpServletRequest getOriginalRequest(PortletRequest request) {
		try {
			Method getRealRequestMethod = request.getClass().getMethod("getRealRequest");
			HttpServletRequestWrapper originalRequest = (HttpServletRequestWrapper) getRealRequestMethod.invoke(request);
			return originalRequest;
		} catch (Exception e) {
			throw new IllegalStateException("An error occurred while getting the HttpServletRequest.", e);
		}
	}
}
```
