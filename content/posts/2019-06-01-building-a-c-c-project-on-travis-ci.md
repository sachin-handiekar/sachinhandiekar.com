---
template: post
title: Building a C/C++ project on Travis CI
slug: /2015/09/building-a-cc-project-on-travis-ci/
draft: false
date: 2015-09-02T20:02:57.718Z
description: A quick tutorial showing how to build C/C++ project on Travis CI
category: C++
tags:
  - C++
  - Travis CI
---
Let’s see how we can use Travis CI for building a C/C++ project on Travis CI. We’ll use the consoleRadio C application which is used to stream Shoutcast Radio as an exampleThe .travis.yml file for the consoleRadio application looks like the following –

Installing a custom version of cmake
We can install a custom version of cmake in Travis CI, using the following script –



Building a library from source

A library/dependency in Travis CI can be build from source and installed on Travis CI env.  –

1. Let’s build the mpg123 library from source and install it on Travis CI. In .travis.yml, we’ll have the following config –

2. We’ll create a bash script (installMPG123.sh) with the following content –
