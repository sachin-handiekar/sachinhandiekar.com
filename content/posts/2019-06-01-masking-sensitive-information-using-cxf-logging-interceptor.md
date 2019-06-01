---
template: post
title: Masking Sensitive Information using CXF Logging Interceptor
slug: /2014/11/masking-sensitive-information-using-cxf-logging-interceptor/
draft: false
date: 2014-11-19T21:26:51.188Z
description: >-
  A tutorial showing masking sensitive information when using CXF Logging IN/OUT
  interceptor.
category: Apache CXF
tags:
  - Apache CXF
---
In this article we’ll see how to mask/hide sensitive information when using CXF Logging IN/OUT Interceptor.

The solution was built to run on Apache Karaf / Fuse ESB, but a similar approach can be utilised to run the custom logging interceptor on other environments.

```
package com.sachinhandiekar.cxf.logger;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class SecureLoggingUtil {

	private String maskingChar;

	private String secureFields;

	private static final String REGEX_SPLIT = ",";
	
	private static final char SLASH = '/';

	public String maskSensitiveFields(String data) {
		List<String> sensitiveFieldsList = Arrays.asList(secureFields.trim()
				.split(REGEX_SPLIT));

		for (String sensitiveField : sensitiveFieldsList) {
			int beginIndex = 0;
			int lastIndex = -1;
			boolean emptyPass = false;

			while (beginIndex != -1
					&& (beginIndex = StringUtils.indexOfIgnoreCase(data, sensitiveField,
							beginIndex)) > 0) {

				beginIndex = StringUtils.indexOf(data, ">", beginIndex);
				if (beginIndex != -1) {
					char ch = data.charAt(beginIndex - 1);
					if (ch == SLASH) {
						emptyPass = true;
					}
					if (!emptyPass) {
						lastIndex = StringUtils.indexOf(data, "<", beginIndex);
						if (lastIndex != -1) {
							String overlay = maskingChar;
							String str2 = StringUtils.substring(data,
									beginIndex + 1, lastIndex);
							if (str2 != null && str2.length() > 1) {
								overlay = StringUtils.rightPad(overlay,
										str2.length(), maskingChar);

								int temp = beginIndex + 1;
								data = StringUtils.overlay(data, overlay, temp,
										lastIndex);
							}
						}
					}
					if (emptyPass) {
						emptyPass = false;
						lastIndex = beginIndex + 1;
					} else {
						if (lastIndex != -1) {
							lastIndex = StringUtils
									.indexOf(data, ">", lastIndex);
						}
					}
				}
				beginIndex = lastIndex;
			}
		}
		return data;

	}

	public String getMaskingChar() {
		return maskingChar;
	}

	public void setMaskingChar(String maskingChar) {
		this.maskingChar = maskingChar;
	}

	public String getSecureFields() {
		return secureFields;
	}

	public void setSecureFields(String secureFields) {
		this.secureFields = secureFields;
	}

}
```


```
package com.sachinhandiekar.cxf.logger;

import org.apache.cxf.interceptor.LoggingInInterceptor;

/**
 * A simple logging handler which outputs the bytes of the message to the
 * Logger.
 */
public class SensitiveCXFLoggingInInterceptor extends LoggingInInterceptor {

	private boolean secureFieldStatus;

	private SecureLoggingUtil secureLoggingUtil;

	@Override
	protected String transform(String originalLogString) {

		if (secureFieldStatus) {
			return secureLoggingUtil.maskSensitiveFields(originalLogString);
		}

		return super.transform(originalLogString);
	}

	public SecureLoggingUtil getSecureLoggingUtil() {
		return secureLoggingUtil;
	}

	public void setSecureLoggingUtil(SecureLoggingUtil secureLoggingUtil) {
		this.secureLoggingUtil = secureLoggingUtil;
	}

	public boolean isSecureFieldStatus() {
		return secureFieldStatus;
	}

	public void setSecureFieldStatus(boolean secureFieldStatus) {
		this.secureFieldStatus = secureFieldStatus;
	}

}
```

```
package com.sachinhandiekar.cxf.logger;

import org.apache.cxf.interceptor.LoggingOutInterceptor;

public class SensitiveCXFLoggingOutInterceptor extends LoggingOutInterceptor {

	private boolean secureFieldStatus;

	private SecureLoggingUtil secureLoggingUtil;

	@Override
	protected String transform(String originalLogString) {

		if (secureFieldStatus) {
			return secureLoggingUtil.maskSensitiveFields(originalLogString);
		}

		return super.transform(originalLogString);
	}

	public SecureLoggingUtil getSecureLoggingUtil() {
		return secureLoggingUtil;
	}

	public void setSecureLoggingUtil(SecureLoggingUtil secureLoggingUtil) {
		this.secureLoggingUtil = secureLoggingUtil;
	}

	public boolean isSecureFieldStatus() {
		return secureFieldStatus;
	}

	public void setSecureFieldStatus(boolean secureFieldStatus) {
		this.secureFieldStatus = secureFieldStatus;
	}
	 
}
```


Another approach using SOAP Payload - https://gist.github.com/sachin-handiekar/14b2ec8665f894970da1

