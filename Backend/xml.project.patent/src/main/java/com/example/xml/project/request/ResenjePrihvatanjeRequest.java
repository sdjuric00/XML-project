package com.example.xml.project.request;

import javax.xml.bind.annotation.*;

@XmlRootElement(name="resenje")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="resenje",
    propOrder={"referenca_na_zahtev", "ime_prezime_sluzbenika", "sifra_obradjenog_zahteva"}
)
public class ResenjePrihvatanjeRequest {

    @XmlElement(name="referenca_na_zahtev", required = true)
    private String referenca_na_zahtev;

    @XmlElement(name="ime_prezime_sluzbenika", required = true)
    private String ime_prezime_sluzbenika;

    @XmlElement(name="sifra_obradjenog_zahteva", required = true)
    private String sifra_obradjenog_zahteva;

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
}
