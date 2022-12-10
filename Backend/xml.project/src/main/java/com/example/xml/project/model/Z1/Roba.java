package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="roba", propOrder={"roba"}, namespace = "http://www.zig/zig")
public class Roba {

    @XmlValue
    private String roba;

    public String getRoba() {
        return roba;
    }

    public void setRoba(String roba) {
        this.roba = roba;
    }
}
