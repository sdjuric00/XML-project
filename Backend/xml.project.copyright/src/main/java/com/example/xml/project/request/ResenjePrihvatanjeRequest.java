package com.example.xml.project.request;

import javax.xml.bind.annotation.*;

@XmlRootElement(name="resenje")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="resenje",
    propOrder={"referenca_na_zahtev", "broj_prijave","ime_prezime_sluzbenika", "sifra_obradjenog_zahteva", "opis_checkbox", "primer_checkbox"}
)
public class ResenjePrihvatanjeRequest {

    @XmlElement(name="referenca_na_zahtev", required = true)
    private String referenca_na_zahtev;

    @XmlElement(name="broj_prijave", required = true)
    private String broj_prijave;

    @XmlElement(name="ime_prezime_sluzbenika", required = true)
    private String ime_prezime_sluzbenika;

    @XmlElement(name="sifra_obradjenog_zahteva", required = true)
    private String sifra_obradjenog_zahteva;

    @XmlElement(name="opis_checkbox", required = true)
    private boolean opis_checkbox;

    @XmlElement(name="primer_checkbox", required = true)
    private boolean primer_checkbox;

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

    public boolean isOpis_checkbox() {
        return opis_checkbox;
    }

    public void setOpis_checkbox(boolean opis_checkbox) {
        this.opis_checkbox = opis_checkbox;
    }

    public boolean isPrimer_checkbox() {
        return primer_checkbox;
    }

    public void setPrimer_checkbox(boolean primer_checkbox) {
        this.primer_checkbox = primer_checkbox;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }
}
