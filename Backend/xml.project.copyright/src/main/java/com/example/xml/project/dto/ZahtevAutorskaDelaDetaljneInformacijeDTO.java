package com.example.xml.project.dto;

import com.example.xml.project.model.*;
import com.example.xml.project.model.A1.Autor;
import com.example.xml.project.model.A1.AutorskoDelo;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@XmlRootElement(name="zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela")
public class ZahtevAutorskaDelaDetaljneInformacijeDTO {

    private String id;
    private String broj_prijave;
    private LocalDate datum_podnosenja;
    private boolean pregledano = false;
    private String referenca_na_podnosioca;
    private String referenca_na_resenje = "-1";
    private Institucija institucija;
    private Podnosilac podnosilac;
    private Punomocnik punomocnik;
    private AutorskoDelo autorsko_delo;
    private List<Autor> autori = new ArrayList<>();
    private Prilozi prilozi;

    public ZahtevAutorskaDelaDetaljneInformacijeDTO() {
    }

    public ZahtevAutorskaDelaDetaljneInformacijeDTO(final ZahtevAutorskaDela zahtevAutorskaDela) {
        this.id = zahtevAutorskaDela.getId();
        this.broj_prijave = zahtevAutorskaDela.getBroj_prijave();
        this.datum_podnosenja = zahtevAutorskaDela.getDatum_podnosenja();
        this.pregledano = zahtevAutorskaDela.isPregledano();
        this.referenca_na_podnosioca = zahtevAutorskaDela.getReferenca_na_podnosioca();
        this.referenca_na_resenje = zahtevAutorskaDela.getReferenca_na_resenje();
        this.institucija = zahtevAutorskaDela.getInstitucija();
        this.podnosilac = zahtevAutorskaDela.getPodnosilac();
        this.punomocnik = zahtevAutorskaDela.getPunomocnik();
        this.autorsko_delo = zahtevAutorskaDela.getAutorsko_delo();
        this.autori = zahtevAutorskaDela.getAutori();
        this.prilozi = zahtevAutorskaDela.getPrilozi();
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
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

    public String getReferenca_na_resenje() {
        return referenca_na_resenje;
    }

    public void setReferenca_na_resenje(String referenca_na_resenje) {
        this.referenca_na_resenje = referenca_na_resenje;
    }

    public String getReferenca_na_podnosioca() {
        return referenca_na_podnosioca;
    }

    public void setReferenca_na_podnosioca(String referenca_na_podnosioca) {
        this.referenca_na_podnosioca = referenca_na_podnosioca;
    }
}
