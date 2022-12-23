package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="pravo_prvenstva", propOrder={"osnov"}, namespace = "http://www.zig/zig")
public class PravoPrvenstva {

    @XmlAttribute(name = "zatrazeno", required = true)
    private boolean zatrazeno;

    @XmlElement(name = "osnov", required = false, namespace = "http://www.zig/zig")
    private String osnov;

    public boolean isZatrazeno() {
        return zatrazeno;
    }

    public void setZatrazeno(boolean zatrazeno) {
        this.zatrazeno = zatrazeno;
    }

    public String getOsnov() {
        return osnov;
    }

    public void setOsnov(String osnov) {
        this.osnov = osnov;
    }
}
