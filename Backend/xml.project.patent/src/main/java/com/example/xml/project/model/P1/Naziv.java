package com.example.xml.project.model.P1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="naziv_patenta",
        namespace = "http://www.patent/patent"
)
public class Naziv {

    @XmlAttribute(name="jezik", required = true)
    private String jezik;
    @XmlValue
    private String naziv_patenta;

    public String getJezik() {
        return jezik;
    }

    public void setJezik(String jezik) {
        this.jezik = jezik;
    }

    public String getNaziv_patenta() {
        return naziv_patenta;
    }

    public void setNaziv_patenta(String naziv_patenta) {
        this.naziv_patenta = naziv_patenta;
    }
}
