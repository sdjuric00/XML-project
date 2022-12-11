package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="boja", propOrder={"naziv"}, namespace = "http://www.zig/zig")
public class Boja {

    @XmlElement(name = "naziv", required = true, namespace = "http://www.zig/zig")
    private String naziv;

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }
}
