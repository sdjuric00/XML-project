package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="boja", propOrder={"boja"}, namespace = "http://www.zig/zig")
public class Boja {

    @XmlValue
    private String boja;

    public String getBoja() {
        return boja;
    }

    public void setBoja(String boja) {
        this.boja = boja;
    }
}
