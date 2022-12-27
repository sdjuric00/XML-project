package com.example.xml.project.model.Korisnici;

import org.springframework.security.core.GrantedAuthority;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

@XmlEnum
public enum TipNaloga implements GrantedAuthority{
    @XmlEnumValue("sluzbenik") ROLE_SLUZBENIK,
    @XmlEnumValue("gradjanin") ROLE_GRADJANIN;


    @Override
    public String getAuthority() {
        return name();
    }
}
