package com.example.xml.project.model.A1;

import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Prilog;
import com.example.xml.project.model.Punomocnik;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela",
    propOrder={"institucija", "podnosilac", "punomocnik", "autorsko_delo", "autori", "prilozi"},
    namespace = "http://ftn.ac.rs/a"
)
public class ZahtevAutorskaDela {

    @XmlAttribute(name="obrazac", required = true)
    public String obrazac;

    @XmlAttribute(name="broj_prijave", required = true)
    public String broj_prijave;

    @XmlAttribute(name="datum_podnosenja", required = true)
    public String datum_podnosenja;

    @XmlAttribute(name="pregledano", required = true)
    public boolean pregledano = false;

    @XmlElement(name="institucija", required = true, namespace = "http://ftn.ac.rs/a")
    public Institucija institucija;

    @XmlElement(name="podnosilac", required = true, namespace = "http://ftn.ac.rs/a")
    public Podnosilac podnosilac;

    @XmlElement(name="punomocnik", required = true, namespace = "http://ftn.ac.rs/a")
    public Punomocnik punomocnik;

    @XmlElement(name="autorsko_delo", required = true, namespace = "http://ftn.ac.rs/a")
    public AutorskoDelo autorsko_delo;

    @XmlElementWrapper(name="autori", namespace = "http://ftn.ac.rs/a")
    @XmlElement(name="autor", namespace = "http://ftn.ac.rs/a")
    public List<Autor> autori = new ArrayList<>();

    @XmlElementWrapper(name="prilozi", namespace = "http://ftn.ac.rs/a")
    @XmlElement(name="prilog", namespace = "http://ftn.ac.rs/a")
    public List<Prilog> prilozi = new ArrayList<>();

    public String getObrazac() {
        return obrazac;
    }

    public void setObrazac(String obrazac) {
        this.obrazac = obrazac;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    public String getDatum_podnosenja() {
        return datum_podnosenja;
    }

    public void setDatum_podnosenja(String datum_podnosenja) {
        this.datum_podnosenja = datum_podnosenja;
    }

    public boolean isPregledano() {
        return pregledano;
    }

    public void setPregledano(boolean pregledano) {
        this.pregledano = pregledano;
    }

    public Institucija getInstitucija() {
        return institucija;
    }

    public void setInstitucija(Institucija institucija) {
        this.institucija = institucija;
    }

    public Podnosilac getPodnosilac() {
        return podnosilac;
    }

    public void setPodnosilac(Podnosilac podnosilac) {
        this.podnosilac = podnosilac;
    }

    public Punomocnik getPunomocnik() {
        return punomocnik;
    }

    public void setPunomocnik(Punomocnik punomocnik) {
        this.punomocnik = punomocnik;
    }

    public AutorskoDelo getAutorsko_delo() {
        return autorsko_delo;
    }

    public void setAutorsko_delo(AutorskoDelo autorsko_delo) {
        this.autorsko_delo = autorsko_delo;
    }

    public List<Autor> getAutori() {
        return autori;
    }

    public void setAutori(List<Autor> autori) {
        this.autori = autori;
    }

    public List<Prilog> getPrilozi() {
        return prilozi;
    }

    public void setPrilozi(List<Prilog> prilozi) {
        this.prilozi = prilozi;
    }
}
