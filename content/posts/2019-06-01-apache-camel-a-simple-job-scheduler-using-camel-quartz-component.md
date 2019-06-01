---
template: post
title: Apache Camel - A simple job scheduler using camel-quartz component
slug: /2014/11/a-simple-job-scheduler-using-camel-quartz-component/
draft: false
date: 2014-11-04T21:33:59.968Z
description: A tutorial showing creating a job scheduler using camel-quartz component.
category: Apache Camel
tags:
  - Apache Camel
---
A simple scheduler using camel-quartz component.

```
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:camel="http://camel.apache.org/schema/blueprint"
       xsi:schemaLocation="
       http://www.osgi.org/xmlns/blueprint/v1.0.0 http://www.osgi.org/xmlns/blueprint/v1.0.0/blueprint.xsd
       http://camel.apache.org/schema/blueprint http://camel.apache.org/schema/blueprint/camel-blueprint.xsd">


    <bean id="quartz" class="org.apache.camel.component.quartz.QuartzComponent">
        <property name="startDelayedSeconds" value="5"/>
    </bean>

  <camelContext id="blueprintContext" trace="false" xmlns="http://camel.apache.org/schema/blueprint">

      <packageScan>
          <package>com.sachinhandiekar.examples</package>
      </packageScan>


  </camelContext>

</blueprint>
```

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sachinhandiekar.examples</groupId>
  <artifactId>camel-quartz-example</artifactId>
  <packaging>bundle</packaging>
  <version>1.0-SNAPSHOT</version>

  <name>camel-quartz demo</name>
  <url>http://sachinhandiekar.com</url>

  <properties>
      <camel.version>2.10.0.redhat-60024</camel.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.apache.camel</groupId>
      <artifactId>camel-core</artifactId>
      <version>${camel.version}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.camel</groupId>
      <artifactId>camel-blueprint</artifactId>
        <version>${camel.version}</version>
    </dependency>
      <dependency>
          <groupId>org.apache.camel</groupId>
          <artifactId>camel-quartz</artifactId>
          <version>${camel.version}</version>
      </dependency>
    <!-- logging -->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.5</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-log4j12</artifactId>
      <version>1.7.5</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>jcl-over-slf4j</artifactId>
      <version>1.7.5</version>
    </dependency>
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>

    <!-- testing -->
    <dependency>
      <groupId>org.apache.camel</groupId>
      <artifactId>camel-test-blueprint</artifactId>
        <version>${camel.version}</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <defaultGoal>install</defaultGoal>

    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.5.1</version>
        <configuration>
          <source>1.6</source>
          <target>1.6</target>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-resources-plugin</artifactId>
        <version>2.6</version>
        <configuration>
          <encoding>UTF-8</encoding>
        </configuration>
      </plugin>

      <!-- to generate the MANIFEST-FILE of the bundle -->
      <plugin>
        <groupId>org.apache.felix</groupId>
        <artifactId>maven-bundle-plugin</artifactId>
        <version>2.3.7</version>
        <extensions>true</extensions>
        <configuration>
          <instructions>
            <Bundle-SymbolicName>SampleRoute</Bundle-SymbolicName>
            <Private-Package>com.sample.*</Private-Package>
            <Import-Package>*</Import-Package>
          </instructions>
        </configuration>
      </plugin>


    </plugins>


  </build>


    <repositories>
        <repository>
            <id>fusesource</id>
            <url>http://repo.fusesource.com/nexus/content/groups/public/</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>
        <repository>
            <id>fusesource.snapshot</id>
            <url>http://repo.fusesource.com/nexus/content/groups/public-snapshots/</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
            <releases>
                <enabled>false</enabled>
            </releases>
        </repository>
        <repository>
            <id>apache-public</id>
            <url>https://repository.apache.org/content/groups/public/</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>


    </repositories>
</project>
```


```
package com.sachinhandiekar.examples;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;

/**
 * @author Sachin Handiekar
 */
public class QuartzRoute extends RouteBuilder {


    @Override
    public void configure() throws Exception {


        from("quartz://myGroupName/myTimerName?cron=0/5+*+*+*+*+?")
        .process(new Processor() {
            @Override
            public void process(Exchange exchange) throws Exception {
                System.out.println("I'm running every 5 sec...");
            }
        });
    }
}
```
