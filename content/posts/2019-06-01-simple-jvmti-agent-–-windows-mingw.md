---
template: post
title: Simple JVMTI Agent – Windows / MinGW
slug: /2015/09/simple-jvmti-agent-windows-mingw/
draft: false
date: 2015-09-30T20:03:58.027Z
description: A tutorial showing building a simple JVMTI agent using MinGW
category: JVMTI
---
A simple JVMTI agent in Windows using MinGW/Cygwin.

```
#include <jvmti.h>
#include <stdio.h>

JNIEXPORT jint JNICALL Agent_OnLoad(JavaVM *jvm, char *options, void *reserved) {
	printf("I'm a native Agent....");
	return JNI_OK;
} 
```

Compiling the program
```
gcc -c -o simpleJVMTI.o -I"%JAVA_HOME%\include" -I"%JAVA_HOME%\include\win32"  SimpleJVMTI.c
```
Creating a DLL file
```
gcc -shared -o simpleJVMTI.dll  simpleJVMTI.o
```
Simple Hello World application
```
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("I'm inside main()");
	}
}
```
Running the Java application with the native agent
```
java -agentpath:C:/path/to/simpleJVMTI.dll HelloWorld
```
Output :
```
I'm inside main()
I'm a native Agent....
```
