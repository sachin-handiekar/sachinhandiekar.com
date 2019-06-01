---
template: post
title: 'Java 9 : Immutable Collections using of() and copyOf()'
slug: /2019/05/java-9-immutable-collections-using-of-and-copyof/
draft: false
date: 2019-06-01T19:57:59.907Z
description: >-
  A tutorial showing the use of() and copyOf() in Java 9 to create Immutable
  Collections.
category: Java 9
tags:
  - Java 9
---
In this tutorial we will see how we can use of() and copyOf() factory methods in Java 9 to create immutable collections.

Project Setup

1. JDK 9+

Code

Let’s see how we can create an immutable list using Collections.unmodifiableList and List.of (Java 9+)

```

         /**
         * List
         */
        //Before Java 9
        List names = new ArrayList<>();
        names.add("London");
        names.add("Mumbai");
        names.add("Delhi");
        names.forEach(System.out::println);

        List unmodifiableList = Collections.unmodifiableList(names);
        // List unmodifiableList2 = Collections.unmodifiableList(Arrays.asList("London", "Mumbai", "Delhi"));
        
        unmodifiableList.forEach(System.out::println);
        // unmodifiableList.add("NewYork"); -- This will throw - java.lang.UnsupportedOperationException

        // Java 9 and beyond
        // Using of() static factory methods for List
        List citiesList = List.of("London", "Mumbai", "Delhi");
        citiesList.forEach(System.out::println);

        // citiesList.add("NewYork"); - This will throw - java.lang.UnsupportedOperationException
```

Using Set –

```
/**
 * Set
*/
Set nameSet =new HashSet<>();
nameSet.add("Sachin");
nameSet.add("Raj");
nameSet.add("Aparna");

nameSet.forEach(System.out::println);

// Alternative Way using array
new HashSet<>(Arrays.asList("London", "Mumbai", "Delhi", "Newyork", "Indore")).forEach(System.out::println);
```
 
