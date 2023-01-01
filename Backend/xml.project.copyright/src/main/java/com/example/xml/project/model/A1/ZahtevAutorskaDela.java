package com.example.xml.project.model.A1;

import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Prilozi;
import com.example.xml.project.model.Punomocnik;
import com.example.xml.project.model.*;
import com.example.xml.project.util.IdentifiableEntity;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela", namespace = "http://ftn.ac.rs/a")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela",
    propOrder={"institucija", "podnosilac", "punomocnik", "autorsko_delo", "autori", "prilozi"},
    namespace = "http://ftn.ac.rs/a"
)
public class ZahtevAutorskaDela implements IdentifiableEntity {

    @XmlAttribute(name="id", required = true)
    private String id;

    @XmlAttribute(name="broj_prijave", required = true)
    private String broj_prijave;

    @XmlAttribute(name="datum_podnosenja", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate datum_podnosenja;

    @XmlAttribute(name="pregledano", required = true)
    private boolean pregledano = false;

    @XmlElement(name="institucija", required = true, namespace = "http://ftn.ac.rs/a")
    private Institucija institucija;

    @XmlElement(name="podnosilac", required = true, namespace = "http://ftn.ac.rs/a")
    private Podnosilac podnosilac;

    @XmlElement(name="punomocnik", required = true, namespace = "http://ftn.ac.rs/a")
    private Punomocnik punomocnik;

    @XmlElement(name="autorsko_delo", required = true, namespace = "http://ftn.ac.rs/a")
    private AutorskoDelo autorsko_delo;

    @XmlElementWrapper(name="autori", namespace = "http://ftn.ac.rs/a")
    @XmlElement(name="autor", namespace = "http://ftn.ac.rs/a")
    private List<Autor> autori = new ArrayList<>();

    @XmlElement(name="prilozi", required = true, namespace = "http://ftn.ac.rs/a")
    private Prilozi prilozi;

    public ZahtevAutorskaDela() {

    }

    public ZahtevAutorskaDela(
            final String id,
            final String broj_prijave,
            final LocalDate datum_podnosenja,
            final boolean pregledano,
            final Institucija institucija,
            final Podnosilac podnosilac,
            final Punomocnik punomocnik,
            final AutorskoDelo autorsko_delo,
            final List<Autor> autori,
            final Prilozi prilozi
    ) {
        this.id = id;
        this.broj_prijave = broj_prijave;
        this.datum_podnosenja = datum_podnosenja;
        this.pregledano = pregledano;
        this.institucija = institucija;
        this.podnosilac = podnosilac;
        this.punomocnik = punomocnik;
        this.autorsko_delo = autorsko_delo;
        this.autori = autori;
        this.prilozi = prilozi;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDatum_podnosenja() {
        return datum_podnosenja;
    }

    public void setDatum_podnosenja(LocalDate datum_podnosenja) {
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

    public Prilozi getPrilozi() {
        return prilozi;
    }

    public void setPrilozi(Prilozi prilozi) {
        this.prilozi = prilozi;
    }
}
