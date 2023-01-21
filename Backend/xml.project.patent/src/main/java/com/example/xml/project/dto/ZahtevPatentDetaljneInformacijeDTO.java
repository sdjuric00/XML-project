package com.example.xml.project.dto;

import com.example.xml.project.model.*;
import com.example.xml.project.model.P1.*;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@XmlRootElement(name="zahtev_za_priznavanje_patenta")
public class ZahtevPatentDetaljneInformacijeDTO {

    private String id;
    private String broj_prijave;
    private LocalDate datum_podnosenja;
    private LocalDate datum_obrade;
    private boolean pregledano = false;
    private String referenca_na_podnosioca;
    private String referenca_na_resenje = "-1";
    private Institucija institucija;
    private Podnosilac podnosilac;
    private PronalazacP pronalazac;
    private PunomocnikP punomocnik;
    private List<Naziv> podaci_o_pronalasku;
    private boolean dopunska_prijava;
    private Dostavljanje dostavljanje;
    private List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava = new ArrayList<>();

    public ZahtevPatentDetaljneInformacijeDTO() {
    }

    public ZahtevPatentDetaljneInformacijeDTO(final ZahtevPatent zahtevPatent) {
        this.id = zahtevPatent.getId();
        this.broj_prijave = zahtevPatent.getBroj_prijave();
        this.datum_podnosenja = zahtevPatent.getDatum_prijema();
        this.datum_obrade = zahtevPatent.getPriznati_datum_podnosenja();
        this.pregledano = zahtevPatent.isPregledano();
        this.referenca_na_podnosioca = zahtevPatent.getReferenca_na_podnosioca();
        this.referenca_na_resenje = zahtevPatent.getReferenca_na_resenje();
        this.institucija = zahtevPatent.getInstitucija();
        this.podnosilac = zahtevPatent.getPodnosilac();
        this.pronalazac = zahtevPatent.getPronalazac();
        this.punomocnik = zahtevPatent.getPunomocnik();
        this.podaci_o_pronalasku = zahtevPatent.getPodaci_o_pronalasku();
        this.dopunska_prijava = zahtevPatent.isDopunska_prijava();
        this.dostavljanje = zahtevPatent.getDostavljanje();
        this.zahtev_za_priznanje_prava_iz_ranijih_prijava = zahtevPatent.getZahtev_za_priznanje_prava_iz_ranijih_prijava();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getDatum_podnosenja() {
        return datum_podnosenja;
    }

    public void setDatum_podnosenja(LocalDate datum_podnosenja) {
        this.datum_podnosenja = datum_podnosenja;
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getDatum_obrade() {
        return datum_obrade;
    }

    public void setDatum_obrade(LocalDate datum_obrade) {
        this.datum_obrade = datum_obrade;
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

    public PronalazacP getPronalazac() {
        return pronalazac;
    }

    public void setPronalazac(PronalazacP pronalazac) {
        this.pronalazac = pronalazac;
    }

    public PunomocnikP getPunomocnik() {
        return punomocnik;
    }

    public void setPunomocnik(PunomocnikP punomocnik) {
        this.punomocnik = punomocnik;
    }

    public List<Naziv> getPodaci_o_pronalasku() {
        return podaci_o_pronalasku;
    }

    public void setPodaci_o_pronalasku(List<Naziv> podaci_o_pronalasku) {
        this.podaci_o_pronalasku = podaci_o_pronalasku;
    }

    public boolean isDopunska_prijava() {
        return dopunska_prijava;
    }

    public void setDopunska_prijava(boolean dopunska_prijava) {
        this.dopunska_prijava = dopunska_prijava;
    }

    public Dostavljanje getDostavljanje() {
        return dostavljanje;
    }

    public void setDostavljanje(Dostavljanje dostavljanje) {
        this.dostavljanje = dostavljanje;
    }

    public List<Prijava> getZahtev_za_priznanje_prava_iz_ranijih_prijava() {
        return zahtev_za_priznanje_prava_iz_ranijih_prijava;
    }

    public void setZahtev_za_priznanje_prava_iz_ranijih_prijava(List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava) {
        this.zahtev_za_priznanje_prava_iz_ranijih_prijava = zahtev_za_priznanje_prava_iz_ranijih_prijava;
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
