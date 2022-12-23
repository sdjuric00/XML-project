package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum FormaZapisaEnum {
    @XmlEnumValue("oslikano") OSLIKANO,
    @XmlEnumValue("pisano") PISANO,
    @XmlEnumValue("stampano") STAMPANO,
    @XmlEnumValue("opticki_disk") OPTICKI_DISK
}
