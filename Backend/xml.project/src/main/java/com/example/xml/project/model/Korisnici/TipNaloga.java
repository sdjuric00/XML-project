package com.example.xml.project.model.Korisnici;

import org.springframework.security.core.GrantedAuthority;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum TipNaloga {
    @XmlEnumValue("sluzbenik") SLUZBENIK,
    @XmlEnumValue("gradjanin") GRADJANIN;
}
