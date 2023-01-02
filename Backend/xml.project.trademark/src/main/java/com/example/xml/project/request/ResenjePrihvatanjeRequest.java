package com.example.xml.project.request;

import javax.xml.bind.annotation.*;

@XmlRootElement(name="resenje")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="resenje",
    propOrder={
        "referenca_na_zahtev", "ime_prezime_sluzbenika", "sifra_obradjenog_zahteva", "primerak_znaka_dat",
        "spisak_robe_dat", "punomocje_dato", "generalno_punomocje_ranije_prilozeno", "punomocje_ce_biti_naknadno_dostavljeno",
        "opiste_akt", "dokaz_o_pravu_prvenstva", "dokaz_o_uplati_takse"}
)
public class ResenjePrihvatanjeRequest {

    @XmlElement(name="referenca_na_zahtev", required = true)
    private String referenca_na_zahtev;

    @XmlElement(name="ime_prezime_sluzbenika", required = true)
    private String ime_prezime_sluzbenika;

    @XmlElement(name="sifra_obradjenog_zahteva", required = true)
    private String sifra_obradjenog_zahteva;

    @XmlElement(name="primerak_znaka_dat", required = true)
    private boolean primerak_znaka_dat;

    @XmlElement(name="spisak_robe_dat", required = true)
    private boolean spisak_robe_dat;

    @XmlElement(name="punomocje_dato", required = true)
    private boolean punomocje_dato;

    @XmlElement(name="generalno_punomocje_ranije_prilozeno", required = true)
    private boolean generalno_punomocje_ranije_prilozeno;

    @XmlElement(name="punomocje_ce_biti_naknadno_dostavljeno", required = true)
    private boolean punomocje_ce_biti_naknadno_dostavljeno;

    @XmlElement(name="opiste_akt", required = true)
    private boolean opiste_akt;

    @XmlElement(name="dokaz_o_pravu_prvenstva", required = true)
    private boolean dokaz_o_pravu_prvenstva;

    @XmlElement(name="dokaz_o_uplati_takse", required = true)
    private boolean dokaz_o_uplati_takse;

    public String getReferenca_na_zahtev() {
        return referenca_na_zahtev;
    }

    public void setReferenca_na_zahtev(String referenca_na_zahtev) {
        this.referenca_na_zahtev = referenca_na_zahtev;
    }

    public String getIme_prezime_sluzbenika() {
        return ime_prezime_sluzbenika;
    }

    public void setIme_prezime_sluzbenika(String ime_prezime_sluzbenika) {
        this.ime_prezime_sluzbenika = ime_prezime_sluzbenika;
    }

    public String getSifra_obradjenog_zahteva() {
        return sifra_obradjenog_zahteva;
    }

    public void setSifra_obradjenog_zahteva(String sifra_obradjenog_zahteva) {
        this.sifra_obradjenog_zahteva = sifra_obradjenog_zahteva;
    }

    public boolean isPrimerak_znaka_dat() {
        return primerak_znaka_dat;
    }

    public void setPrimerak_znaka_dat(boolean primerak_znaka_dat) {
        this.primerak_znaka_dat = primerak_znaka_dat;
    }

    public boolean isSpisak_robe_dat() {
        return spisak_robe_dat;
    }

    public void setSpisak_robe_dat(boolean spisak_robe_dat) {
        this.spisak_robe_dat = spisak_robe_dat;
    }

    public boolean isPunomocje_dato() {
        return punomocje_dato;
    }

    public void setPunomocje_dato(boolean punomocje_dato) {
        this.punomocje_dato = punomocje_dato;
    }

    public boolean isGeneralno_punomocje_ranije_prilozeno() {
        return generalno_punomocje_ranije_prilozeno;
    }

    public void setGeneralno_punomocje_ranije_prilozeno(boolean generalno_punomocje_ranije_prilozeno) {
        this.generalno_punomocje_ranije_prilozeno = generalno_punomocje_ranije_prilozeno;
    }

    public boolean isPunomocje_ce_biti_naknadno_dostavljeno() {
        return punomocje_ce_biti_naknadno_dostavljeno;
    }

    public void setPunomocje_ce_biti_naknadno_dostavljeno(boolean punomocje_ce_biti_naknadno_dostavljeno) {
        this.punomocje_ce_biti_naknadno_dostavljeno = punomocje_ce_biti_naknadno_dostavljeno;
    }

    public boolean isOpiste_akt() {
        return opiste_akt;
    }

    public void setOpiste_akt(boolean opiste_akt) {
        this.opiste_akt = opiste_akt;
    }

    public boolean isDokaz_o_pravu_prvenstva() {
        return dokaz_o_pravu_prvenstva;
    }

    public void setDokaz_o_pravu_prvenstva(boolean dokaz_o_pravu_prvenstva) {
        this.dokaz_o_pravu_prvenstva = dokaz_o_pravu_prvenstva;
    }

    public boolean isDokaz_o_uplati_takse() {
        return dokaz_o_uplati_takse;
    }

    public void setDokaz_o_uplati_takse(boolean dokaz_o_uplati_takse) {
        this.dokaz_o_uplati_takse = dokaz_o_uplati_takse;
    }
}
