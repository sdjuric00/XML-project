package com.example.xml.project.dto;

import com.example.xml.project.model.A1.resenje.Resenje;
import com.example.xml.project.model.LocalDateAdapter;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

@XmlRootElement(name="resenje")
public class ResenjeDTO {
    private String id;
    private String referenca_na_zahtev;
    private LocalDate datum_obrade;
    private String ime_prezime_sluzbenika;
    private String razlog_odbijanja;
    private String sifra_obradjenog_zahteva;

    public ResenjeDTO() {
    }

    public ResenjeDTO(Resenje resenje) {
        this.id = resenje.getId();
        this.referenca_na_zahtev = resenje.getReferenca_na_zahtev();
        this.datum_obrade = resenje.getDatum_obrade();
        this.ime_prezime_sluzbenika = resenje.getIme_prezime_sluzbenika();
        this.razlog_odbijanja = resenje.getRazlog_odbijanja();
        this.sifra_obradjenog_zahteva = resenje.getSifra_obradjenog_zahteva();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReferenca_na_zahtev() {
        return referenca_na_zahtev;
    }

    public void setReferenca_na_zahtev(String referenca_na_zahtev) {
        this.referenca_na_zahtev = referenca_na_zahtev;
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getDatum_obrade() {
        return datum_obrade;
    }

    public void setDatum_obrade(LocalDate datum_obrade) {
        this.datum_obrade = datum_obrade;
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

    public String getSifra_obradjenog_zahteva() {
        return sifra_obradjenog_zahteva;
    }

    public void setSifra_obradjenog_zahteva(String sifra_obradjenog_zahteva) {
        this.sifra_obradjenog_zahteva = sifra_obradjenog_zahteva;
    }
}
