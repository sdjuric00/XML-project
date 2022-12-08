package com.example.xml.project.model.P1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="nazivi",
        namespace = "http://www.patent/patent"
)
public class Naziv {

    @XmlAttribute(name="jezik", required = true)
    private String jezik;
    @XmlValue
    private String naziv;

    public String getJezik() {
        return jezik;
    }

    public void setJezik(String jezik) {
        this.jezik = jezik;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }
}
