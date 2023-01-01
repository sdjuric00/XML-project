package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="popunjava_zavod", propOrder={"primerak_znaka","spisak_roba_i_usluga", "punomocje",
   "generalno_punomocje_ranije_prilozeno", "punomocje_ce_biti_naknadno_dostavljeno",
    "opsti_akt", "dokaz_o_pravu_prvenstva","dokaz_o_uplati_takse"})
public class PopunjavaZavod {

    @XmlElement(name="primerak_znaka", required = true)
    private boolean primerak_znaka = false;

    @XmlElement(name="spisak_roba_i_usluga", required = true)
    private boolean spisak_roba_i_usluga = false;

    @XmlElement(name="punomocje", required = true)
    private boolean punomocje= false;

    @XmlElement(name="generalno_punomocje_ranije_prilozeno", required = true)
    private boolean generalno_punomocje_ranije_prilozeno = false;

    @XmlElement(name="punomocje_ce_biti_naknadno_dostavljeno", required = true)
    private boolean punomocje_ce_biti_naknadno_dostavljeno = false;

    @XmlElement(name="opsti_akt", required = true)
    private boolean opsti_akt = false;

    @XmlElement(name="dokaz_o_pravu_prvenstva", required = true)
    private boolean dokaz_o_pravu_prvenstva = false;

    @XmlElement(name="dokaz_o_uplati_takse", required = true)
    private boolean dokaz_o_uplati_takse = false;

    public boolean isPrimerak_znaka() {
        return primerak_znaka;
    }

    public void setPrimerak_znaka(boolean primerak_znaka) {
        this.primerak_znaka = primerak_znaka;
    }

    public boolean isSpisak_roba_i_usluga() {
        return spisak_roba_i_usluga;
    }

    public void setSpisak_roba_i_usluga(boolean spisak_roba_i_usluga) {
        this.spisak_roba_i_usluga = spisak_roba_i_usluga;
    }

    public boolean isPunomocje() {
        return punomocje;
    }

    public void setPunomocje(boolean punomocje) {
        this.punomocje = punomocje;
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

    public boolean isOpsti_akt() {
        return opsti_akt;
    }

    public void setOpsti_akt(boolean opsti_akt) {
        this.opsti_akt = opsti_akt;
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
