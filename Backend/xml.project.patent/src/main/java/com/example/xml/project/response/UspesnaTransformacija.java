package com.example.xml.project.response;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UspesnaTransformacija {

    @XmlAttribute
    private byte[] odgovor;

    public UspesnaTransformacija() {

    }

    public UspesnaTransformacija(final byte[] odgovor) {
        this.odgovor = odgovor;
    }

    public byte[] isOdgovor() {
        return odgovor;
    }
}
