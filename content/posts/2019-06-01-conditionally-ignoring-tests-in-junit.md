---
template: post
title: Conditionally ignoring tests in JUnit
slug: /2015/09/conditionally-ignoring-tests-in-junit/
draft: true
date: 2015-09-23T20:08:17.419Z
description: A tutorial showing ignoring test using a custom condition - jUnit
category: jUnit
---
We might require to ignore a jUnit test based on a certain condition. jUnit just comes up with a @Ignore annotation which can be used to ignore the test.
We can use the below code to check if the condition has been met or not to ignore a test.
```
import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;

public class SampleConditionTest {

    @Before
    public void beforeEveryMethod() {
        Assume.assumeTrue(conditionToTest());
    }

    private boolean conditionToTest() {
        // Add code there to test the condition,
        
        // return true if you want to run the test
        // return false to ignore the test
        return false;
    }

    @Test
    public void testMethod1() {
        // Add code here...
    }
}
```
Reference :

http://stackoverflow.com/questions/1689242/conditionally-ignoring-tests-in-junit-4
