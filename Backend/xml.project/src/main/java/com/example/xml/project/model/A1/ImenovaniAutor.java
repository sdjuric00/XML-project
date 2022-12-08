package com.example.xml.project.model.A1;

import com.example.xml.project.model.Adresa;
import com.example.xml.project.model.Kontakt;
import com.example.xml.project.model.Osoba;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.PROPERTY)
@XmlType(name="korisnik", propOrder={"kontakt", "adresa", "ime", "prezime", "drzavljanstvo", "godina_smrti", "pseudonim"},
    namespace = "http://ftn.ac.rs/a"
)
public class ImenovaniAutor extends Osoba {

    private String ime;
    private String prezime;
    private String drzavljanstvo;
    private String godina_smrti = "-1";
    private String pseudonim;

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

    @XmlElement(name="ime", required = true, namespace = "http://ftn.ac.rs/a")
    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    @XmlElement(name="prezime", required = true, namespace = "http://ftn.ac.rs/a")
    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }


    @XmlElement(name="drzavljanstvo", required = true, namespace = "http://ftn.ac.rs/a")
    public String getDrzavljanstvo() {
        return drzavljanstvo;
    }

    public void setDrzavljanstvo(String drzavljanstvo) {
        this.drzavljanstvo = drzavljanstvo;
    }

    @XmlElement(name="godina_smrti", required = true, namespace = "http://ftn.ac.rs/a")
    public String getGodina_smrti() {
        return godina_smrti;
    }

    public void setGodina_smrti(String godina_smrti) {
        this.godina_smrti = godina_smrti;
    }

    @XmlElement(name="pseudonim", required = true, namespace = "http://ftn.ac.rs/a")
    public String getPseudonim() {
        return pseudonim;
    }

    public void setPseudonim(String pseudonim) {
        this.pseudonim = pseudonim;
    }
}
