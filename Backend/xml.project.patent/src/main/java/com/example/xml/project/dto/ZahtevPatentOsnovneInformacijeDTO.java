package com.example.xml.project.dto;

import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.model.Podnosilac;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

@XmlRootElement(name = "zahtev")
public class ZahtevPatentOsnovneInformacijeDTO {

    private String id;
    private String broj_prijave;
    private LocalDate datum_podnosenja;
    private Podnosilac podnosilac;
    private boolean pregledano;
    private boolean dopunska_prijava;

    public ZahtevPatentOsnovneInformacijeDTO() {
    }

    public ZahtevPatentOsnovneInformacijeDTO(ZahtevPatent zahtevPatent) {
        this.id = zahtevPatent.getId();
        this.broj_prijave = zahtevPatent.getBroj_prijave();
        this.datum_podnosenja = zahtevPatent.getDatum_prijema();
        this.podnosilac = zahtevPatent.getPodnosilac();
        this.pregledano = zahtevPatent.isPregledano();
        this.dopunska_prijava = zahtevPatent.isDopunska_prijava();
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

    public Podnosilac getPodnosilac() {
        return podnosilac;
    }

    public void setPodnosilac(Podnosilac podnosilac) {
        this.podnosilac = podnosilac;
    }

    public boolean isPregledano() {
        return pregledano;
    }

    public void setPregledano(boolean pregledano) {
        this.pregledano = pregledano;
    }

    public boolean isDopunska_prijava() {
        return dopunska_prijava;
    }

    public void setDopunska_prijava(boolean dopunska_prijava) {
        this.dopunska_prijava = dopunska_prijava;
    }
}
