---
template: post
title: OpenJPA Entity Enhancement in OSGI container
slug: /2013/08/openjpa-entity-enhancement-in-osgi-container/
draft: false
date: 2013-08-07T20:43:13.593Z
description: A tutorial showing OpenJPA entity enhancement in OSGi container
category: OpenJPA
tags:
  - OpenJPA
---
Introduction

In this example we will see how to enhance the JPA entities before usage in OSGi container.

Let’s assume we got an entity called Person. 
```
import java.io.Serializable;
 
import javax.persistence.Entity;
import javax.persistence.Id;
 
@Entity
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
 
    @Id
    private long id;
 
    private String name;
 
    public long getId() {
        return id;
    }
 
    public void setId(long id) {
        this.id = id;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
}
```

Maven Dependencies

```
<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>javax.persistence</artifactId>
    <version>2.0.0</version>
    <scope>provided</scope>
</dependency>
  
<dependency>
    <groupId>org.apache.openjpa</groupId>
    <artifactId>openjpa</artifactId>
    <version>2.2.0</version>
</dependency>
```

Maven Plugin

```
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-antrun-plugin</artifactId>
 <executions>
  <execution>
   <phase>compile</phase>
   <configuration>
    <tasks>
     <path id="enhance.path.ref">
      <fileset dir="${project.build.outputDirectory}">
       <include name="Person.class" />
      </fileset>
     </path>
     <pathconvert property="enhance.files" refid="enhance.path.ref"
         pathsep=" " />
     <java classname="org.apache.openjpa.enhance.PCEnhancer">
      <arg line="-p persistence.xml" />
      <arg line="${enhance.files}" />
      <classpath>
       <path refid="maven.dependency.classpath" />
       <path refid="maven.compile.classpath" />
      </classpath>
     </java>
    </tasks>
   </configuration>
   <goals>
    <goal>run</goal>
   </goals>
  </execution>
 </executions>
</plugin>
```
