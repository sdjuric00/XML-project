package com.example.xml.project.model.Z1.enums;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum ZigEnum {
    @XmlEnumValue("individualni") INDIVIDUALNI,
    @XmlEnumValue("kolektivni") KOLEKTIVNI,
    @XmlEnumValue("garancije") GARANCIJE
}
