package com.example.xml.project.model.Korisnici;

import com.example.xml.project.model.Adresa;
import com.example.xml.project.model.Kontakt;
import com.example.xml.project.model.Osoba;
import com.example.xml.project.util.IdentifiableEntity;

import javax.xml.bind.annotation.*;

@XmlRootElement(name="korisnik", namespace = "http://www.korisnici/korisnici")
@XmlAccessorType(XmlAccessType.PROPERTY)
@XmlType(name="korisnik", propOrder={"kontakt", "adresa", "ime", "prezime", "lozinka", "tip_naloga"}, namespace = "http://www.korisnici/korisnici")
public class Korisnik extends Osoba implements IdentifiableEntity {

    private String ime;
    private String prezime;
    private String lozinka;
    private TipNaloga tip_naloga;
    private String id;

    @Override
    @XmlAttribute(name="id", required = true)
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

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

    @XmlElement(name="ime", required = true, namespace = "http://www.korisnici/korisnici")
    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    @XmlElement(name="prezime", required = true, namespace = "http://www.korisnici/korisnici")
    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }


    @XmlElement(name="lozinka", required = true, namespace = "http://www.korisnici/korisnici")
    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    @XmlElement(name="tip_naloga", required = true, namespace = "http://www.korisnici/korisnici")
    public TipNaloga getTip_naloga() {
        return tip_naloga;
    }

    public void setTip_naloga(TipNaloga tip_naloga) {
        this.tip_naloga = tip_naloga;
    }

}
