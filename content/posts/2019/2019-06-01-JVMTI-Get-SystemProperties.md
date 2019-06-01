---
template: post
title: JVMTI – Get System Properties
slug: jvmti-get-system-properties
draft: false
date: 2019-06-01T19:03:02.097Z
description: A sample code snippet showing JVMTI - GetSystemProperty
category: JVMTI
tags:
  - JVMTI
---
In this post we will see how we can use the JVMTI GetSystemProperties to get a list of system properties.


```
#include "jvmti.h"
#include <iostream>

JNIEXPORT jint JNICALL Agent_OnLoad(JavaVM *jvm, char *options, void *reserved) {
    std::cout << "JVMTIGetSystemProperties :: Agent Initiated!!";
    jvmtiEnv *jvmti;
    jvmtiError error;
    jint result;
    jint count = 0;
    char **props;

    result = jvm->GetEnv((void **) &jvmti, JVMTI_VERSION_1_2);

    if (result != JNI_OK) {
        std::cerr << "Unable to access JVMTI!!!";
    }

    error = jvmti->GetSystemProperties(&count, &props);
    if (error != JVMTI_ERROR_NONE) return JNI_FALSE;

    std::cout << "JVMTI Agent (System Property) \n";
    for (int i = 0; i < count; i++) {
        char *value;
        error = jvmti->GetSystemProperty(props[i], &value);
        if (error != JVMTI_ERROR_NONE) return JNI_FALSE;
        std::cout << props[i] << " = " << value << "\n";
    }
    return JNI_OK;
}

```


CMake

```
cmake_minimum_required(VERSION 3.13)
project(JVMTIGetSystemProperties)

set(CMAKE_CXX_STANDARD 11)

if ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
    # using Clang
    message("Clang")
elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
    # using GCC
    message("GCC")
elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Intel")
    # using Intel C++
    message("IntelC++")
elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "MSVC")
    # using Visual Studio C++
    message("Visual Studio C++")
endif ()


# Compiler and Linker flags
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_COLOR_MAKEFILE ON)
#set(CMAKE_VERBOSE_MAKEFILE ON)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wno-long-long -pedantic")
set(CMAKE_CXX_FLAGS_VALGRIND "-fno-inline")
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} ${CMAKE_CXX_FLAGS_VALGRIND} -Werror -Wno-missing-field-initializers -Wmissing-braces")
set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -O4 -DNDEBUG")


find_package(JNI)

if (JNI_FOUND)
    message(STATUS "JNI_INCLUDE_DIRS=${JNI_INCLUDE_DIRS}")
    message(STATUS "JNI_LIBRARIES=${JNI_LIBRARIES}")
endif ()
# Compiler and Linker flags

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_COLOR_MAKEFILE ON)
#set(CMAKE_VERBOSE_MAKEFILE ON)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wno-long-long -pedantic")
set(CMAKE_CXX_FLAGS_VALGRIND "-fno-inline")
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} ${CMAKE_CXX_FLAGS_VALGRIND} -Werror -Wno-missing-field-initializers -Wmissing-braces")
set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -O4 -DNDEBUG")

find_package(JNI)

if (JNI_FOUND)
    message(STATUS "JNI_INCLUDE_DIRS=${JNI_INCLUDE_DIRS}")
    message(STATUS "JNI_LIBRARIES=${JNI_LIBRARIES}")
endif ()

set(HEADER_BASE "${CMAKE_CURRENT_SOURCE_DIR}/include")
include_directories(${JNI_INCLUDE_DIRS})
include_directories(${HEADER_BASE})

set(SOURCE_FILES library.cpp ${HEADER_BASE})

add_library(JVMTIGetSystemProps SHARED ${SOURCE_FILES})
```

Build the code and add the library to a running JVM using the agentlib config parameter.

Full source code available at https://github.com/sachin-handiekar/jvmti-examples
