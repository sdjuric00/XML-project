package com.example.xml.project.request;

import javax.xml.bind.annotation.*;

@XmlRootElement(name="resenje")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="resenje",
    propOrder={"referenca_na_zahtev", "ime_prezime_sluzbenika", "razlog_odbijanja"}
)
public class ResenjeOdbijanjeRequest {

    @XmlElement(name="referenca_na_zahtev", required = true)
    private String referenca_na_zahtev;

    @XmlElement(name="ime_prezime_sluzbenika", required = true)
    private String ime_prezime_sluzbenika;

    @XmlElement(name="razlog_odbijanja", required = true)
    private String razlog_odbijanja;

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

    public String getRazlog_odbijanja() {
        return razlog_odbijanja;
    }

    public void setRazlog_odbijanja(String razlog_odbijanja) {
        this.razlog_odbijanja = razlog_odbijanja;
    }

}
