package com.example.xml.project.model.Z1.enums;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum VrstaZnakaEnum {
    @XmlEnumValue("verbalni") VERBALNI,
    @XmlEnumValue("graficki") GRAFICKI,
    @XmlEnumValue("kombinovani") KOMBINOVANI,
    @XmlEnumValue("trodimenzionalni") TRODIMENZIONALNI
}