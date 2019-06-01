---
template: post
title: 'Java 8 :: Comparator Example'
slug: /2019/05/java-8-comparator-example/
draft: true
date: 2019-06-01T20:00:58.823Z
description: A Java 8 tutorial showing the use of Comparator
category: Java 8
tags:
  - Java 8
---
A code example showing the use of Comparator in Java 8 using Comparator.comparing method.
```
public class Student {

    private String name;
    private String subject;
    private double grade;

    public Student(String name, String subject, double grade) {
        this.name = name;
        this.subject = subject;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public String getSubject() {
        return subject;
    }

    public double getGrade() {
        return grade;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", subject='" + subject + '\'' +
                ", grade=" + grade +
                '}';
    }
}
```
We can use the Comparator.comparing method to sort the Java Object, also the method reveresed the comparison result.
```
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class StudentExample {

    public static void main(String[] args) {
        List studentList = new ArrayList<>();

        studentList.add(new Student("Sachin", "English", 80.45));
        studentList.add(new Student("Raj", "Science", 70.12));
        studentList.add(new Student("Vikram", "Mathematics", 66.54));

        studentList.sort(Comparator.comparing(Student::getGrade)
                .reversed()
                .thenComparing(Student::getName)
                .thenComparing(Student::getSubject));

        System.out.println(studentList);
    }
}
```
