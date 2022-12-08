package com.example.xml.project.model;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="institucija", propOrder={"naziv", "adresa"})
public class Institucija {

    @XmlElement(name="naziv", required = true, namespace = "http://ftn.ac.rs/opste")
    private String naziv;

    @XmlElement(name="adresa", required = true, namespace = "http://ftn.ac.rs/opste")
    private Adresa adresa;

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Adresa getAdresa() {
        return adresa;
    }

    public void setAdresa(Adresa adresa) {
        this.adresa = adresa;
    }
}
