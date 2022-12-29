package com.example.xml.project.dto;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.model.Podnosilac;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

@XmlRootElement(name = "zahtev")
public class ZahtevAutorskaDelaOsnovneInformacijeDTO {

    private String id;
    private String broj_prijave;
    private LocalDate datum_podnosenja;
    private Podnosilac podnosilac;
    private boolean pregledano;

    public ZahtevAutorskaDelaOsnovneInformacijeDTO() {
    }

    public ZahtevAutorskaDelaOsnovneInformacijeDTO(ZahtevAutorskaDela zahtevAutorskaDela) {
        this.id = zahtevAutorskaDela.getId();
        this.broj_prijave = zahtevAutorskaDela.getBroj_prijave();
        this.datum_podnosenja = zahtevAutorskaDela.getDatum_podnosenja();
        this.podnosilac = zahtevAutorskaDela.getPodnosilac();
        this.pregledano = zahtevAutorskaDela.isPregledano();
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
}
