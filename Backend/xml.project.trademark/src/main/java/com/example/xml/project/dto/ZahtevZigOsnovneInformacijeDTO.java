package com.example.xml.project.dto;

import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.model.Punomocnik;
import com.example.xml.project.model.Z1.ZahtevZig;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

@XmlRootElement(name = "zahtev")
public class ZahtevZigOsnovneInformacijeDTO {

    private String id;
    private String broj_prijave;
    private LocalDate datum_podnosenja;
    private Punomocnik punomocnik;
    private boolean pregledano;
    private String vrsta_ziga;

    public ZahtevZigOsnovneInformacijeDTO() {
    }

    public ZahtevZigOsnovneInformacijeDTO(ZahtevZig zahtevZig) {
        this.id = zahtevZig.getId();
        this.broj_prijave = zahtevZig.getBroj_prijave();
        this.datum_podnosenja = zahtevZig.getDatum_podnosenja();
        this.punomocnik = zahtevZig.getPunomocnik();
        this.pregledano = zahtevZig.isPregledano();
        this.vrsta_ziga = zahtevZig.getZig().toString();
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

    public Punomocnik getPunomocnik() {
        return punomocnik;
    }

    public void setPunomocnik(Punomocnik punomocnik) {
        this.punomocnik = punomocnik;
    }

    public String getVrsta_ziga() {
        return vrsta_ziga;
    }

    public void setVrsta_ziga(String vrsta_ziga) {
        this.vrsta_ziga = vrsta_ziga;
    }

    public boolean isPregledano() {
        return pregledano;
    }

    public void setPregledano(boolean pregledano) {
        this.pregledano = pregledano;
    }
}
