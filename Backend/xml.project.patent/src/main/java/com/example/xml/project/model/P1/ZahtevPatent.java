package com.example.xml.project.model.P1;

import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.util.IdentifiableEntity;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="zahtev_za_priznavanje_patenta", namespace = "http://www.patent/patent")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="zahtev_za_priznavanje_patenta",
        propOrder={"institucija", "podaci_o_pronalasku", "podnosilac", "pronalazac", "punomocnik", "dostavljanje", "zahtev_za_priznanje_prava_iz_ranijih_prijava"},
        namespace = "http://www.patent/patent"
)
public class ZahtevPatent implements IdentifiableEntity {

    @XmlAttribute(name="id", required = true)
    private String id;

    @XmlAttribute(name = "referenca_na_resenje")
    private String referenca_na_resenje = "-1";

    @XmlAttribute(name="broj_prijave")
    private String broj_prijave;

    @XmlAttribute(name="datum_prijema", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate datum_prijema;

    @XmlAttribute(name="priznati_datum_podnosenja")
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate priznati_datum_podnosenja;

    @XmlAttribute(name="dopunska_prijava", required = true)
    private boolean dopunska_prijava;

    @XmlAttribute(name="pregledano", required = true)
    private boolean pregledano;

    @XmlAttribute(name="prihvaceno")
    private boolean prihvaceno = false;

    @XmlElement(name="institucija", required = true, namespace = "http://www.patent/patent")
    private Institucija institucija;

    @XmlElementWrapper(name="podaci_o_pronalasku", namespace = "http://www.patent/patent")
    @XmlElement(name="naziv", namespace = "http://www.patent/patent")
    private List<Naziv> podaci_o_pronalasku;

    @XmlElement(name="podnosilac", required = true, namespace = "http://www.patent/patent")
    private Podnosilac podnosilac;

    @XmlElement(name="pronalazac", required = true, namespace = "http://www.patent/patent")
    private PronalazacP pronalazac;

    @XmlElement(name="punomocnik", required = true, namespace = "http://www.patent/patent")
    private PunomocnikP punomocnik;

    @XmlElement(name="dostavljanje", required = true, namespace = "http://www.patent/patent")
    private Dostavljanje dostavljanje;

    @XmlElementWrapper(name="zahtev_za_priznanje_prava_iz_ranijih_prijava", namespace = "http://www.patent/patent")
    @XmlElement(name="prijava", required = true, namespace = "http://www.patent/patent")
    private List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava = new ArrayList<>();

    public ZahtevPatent() {

    }

    public ZahtevPatent(final String id,
                        final String broj_prijave,
                        final LocalDate datum_prijema,
                        final LocalDate priznati_datum_podnosenja,
                        final boolean dopunska_prijava,
                        final boolean pregledano,
                        final Institucija institucija,
                        final List<Naziv> podaci_o_pronalasku,
                        final Podnosilac podnosilac,
                        final PronalazacP pronalazac,
                        final PunomocnikP punomocnik,
                        final Dostavljanje dostavljanje,
                        final List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava
    ) {
        this.id = id;
        this.broj_prijave = broj_prijave;
        this.datum_prijema = datum_prijema;
        this.priznati_datum_podnosenja = priznati_datum_podnosenja;
        this.dopunska_prijava = dopunska_prijava;
        this.pregledano = pregledano;
        this.institucija = institucija;
        this.podaci_o_pronalasku = podaci_o_pronalasku;
        this.podnosilac = podnosilac;
        this.pronalazac = pronalazac;
        this.punomocnik = punomocnik;
        this.dostavljanje = dostavljanje;
        this.zahtev_za_priznanje_prava_iz_ranijih_prijava = zahtev_za_priznanje_prava_iz_ranijih_prijava;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    public LocalDate getDatum_prijema() {
        return datum_prijema;
    }

    public void setDatum_prijema(LocalDate datum_prijema) {
        this.datum_prijema = datum_prijema;
    }

    public LocalDate getPriznati_datum_podnosenja() {
        return priznati_datum_podnosenja;
    }

    public void setPriznati_datum_podnosenja(LocalDate priznati_datum_podnosenja) {
        this.priznati_datum_podnosenja = priznati_datum_podnosenja;
    }

    public boolean isDopunska_prijava() {
        return dopunska_prijava;
    }

    public void setDopunska_prijava(boolean dopunska_prijava) {
        this.dopunska_prijava = dopunska_prijava;
    }

    public Institucija getInstitucija() {
        return institucija;
    }

    public void setInstitucija(Institucija institucija) {
        this.institucija = institucija;
    }

    public List<Naziv> getPodaci_o_pronalasku() {
        return podaci_o_pronalasku;
    }

    public void setPodaci_o_pronalasku(List<Naziv> podaci_o_pronalasku) {
        this.podaci_o_pronalasku = podaci_o_pronalasku;
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

    public boolean isPregledano() {
        return pregledano;
    }

    public void setPregledano(boolean pregledano) {
        this.pregledano = pregledano;
    }

    public String getReferenca_na_resenje() {
        return referenca_na_resenje;
    }

    public void setReferenca_na_resenje(String referenca_na_resenje) {
        this.referenca_na_resenje = referenca_na_resenje;
    }

    public boolean isPrihvaceno() {
        return prihvaceno;
    }

    public void setPrihvaceno(boolean prihvaceno) {
        this.prihvaceno = prihvaceno;
    }
}
