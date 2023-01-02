package com.example.xml.project.model.Z1.enums;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum BrojKlaseEnum {
    @XmlEnumValue("1. Hemijski proizvodi") HEMIJSKI_PROIZVODI,
    @XmlEnumValue("2. Boje i lakovi") BOJE_I_LAKOVI,
    @XmlEnumValue("3. Nemedicinska kozmetika") NEMEDICINSKA_KOZMETIKA,
    @XmlEnumValue("4. Industrija ulja i masti") INDUSTRIJA_ULJA_I_MASTI,
    @XmlEnumValue("5. Farmaceutski proizvodi") FARMACEUTSKI_PROIZVODI
}
