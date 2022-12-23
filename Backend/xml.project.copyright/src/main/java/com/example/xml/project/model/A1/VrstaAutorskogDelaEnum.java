package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum VrstaAutorskogDelaEnum {
    @XmlEnumValue("knjizevno") KNJIZEVNO,
    @XmlEnumValue("muzicko") MUZICKO,
    @XmlEnumValue("likovno") LIKOVNO,
    @XmlEnumValue("racunarski_program") RACUNARSKI_PROGRAM
}
