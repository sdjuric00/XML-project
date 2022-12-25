package com.example.xml.project.util;

public class GeneratorId{

    public static String generateId(String[] resourceList) {
        return Integer.toString(resourceList.length + 1);
    }
}
