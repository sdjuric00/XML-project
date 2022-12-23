package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.PROPERTY)
@XmlType(name="pravno_lice", propOrder={"kontakt", "adresa", "naziv", "pib", "registarski_broj"})
public class PravnoLice extends Osoba {

    private String naziv;
    private String pib;
    private String registarski_broj;

    @Override
    @XmlElement(name="adresa", required = true, namespace = "http://ftn.ac.rs/opste")
    public Adresa getAdresa() {
        return super.adresa;
    }
    @Override
    public void setAdresa(Adresa adresa) {
        this.adresa = adresa;
    }

    @Override
    @XmlElement(name="kontakt", required = true, namespace = "http://ftn.ac.rs/opste")
    public Kontakt getKontakt() {
        return super.kontakt;
    }
    @Override
    public void setKontakt(Kontakt kontakt) {
        this.kontakt = kontakt;
    }

    @XmlElement(name="naziv", required = true, namespace = "http://ftn.ac.rs/opste")
    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    @XmlElement(name="pib", required = true, namespace = "http://ftn.ac.rs/opste")
    public String getPib() {
        return pib;
    }

    public void setPib(String pib) {
        this.pib = pib;
    }

    @XmlElement(name="registarski_broj", required = true, namespace = "http://ftn.ac.rs/opste")
    public String getRegistarski_broj() {
        return registarski_broj;
    }

    public void setRegistarski_broj(String registarski_broj) {
        this.registarski_broj = registarski_broj;
    }
}

