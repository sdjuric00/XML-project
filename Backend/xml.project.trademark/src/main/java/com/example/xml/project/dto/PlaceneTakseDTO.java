package com.example.xml.project.dto;

import com.example.xml.project.model.Z1.PlaceneTakse;

import javax.xml.bind.annotation.*;

@XmlRootElement(name="TaksaObj")
public class PlaceneTakseDTO {

    private String valuta;

    private double osnovna_taksa;

    private double taksa_za_klasu;

    private double taksa_za_graficko_resenje;

    private double ukupno;

    public PlaceneTakseDTO() {

    }

    public PlaceneTakseDTO(final PlaceneTakse placeneTakse) {
        this.valuta = placeneTakse.getValuta();
        this.osnovna_taksa = placeneTakse.getOsnovna_taksa();
        this.taksa_za_klasu = placeneTakse.getTaksa_za_klasu();
        this.taksa_za_graficko_resenje = placeneTakse.getTaksa_za_graficko_resenje();
        this.ukupno = placeneTakse.getUkupno();
    }

    public String getValuta() {
        return valuta;
    }

    public void setValuta(String valuta) {
        this.valuta = valuta;
    }

    public double getOsnovna_taksa() {
        return osnovna_taksa;
    }

    public void setOsnovna_taksa(double osnovna_taksa) {
        this.osnovna_taksa = osnovna_taksa;
    }

    public double getTaksa_za_klasu() {
        return taksa_za_klasu;
    }

    public void setTaksa_za_klasu(double taksa_za_klasu) {
        this.taksa_za_klasu = taksa_za_klasu;
    }

    public double getTaksa_za_graficko_resenje() {
        return taksa_za_graficko_resenje;
    }

    public void setTaksa_za_graficko_resenje(double taksa_za_graficko_resenje) {
        this.taksa_za_graficko_resenje = taksa_za_graficko_resenje;
    }

    public double getUkupno() {
        return ukupno;
    }

    public void setUkupno(double ukupno) {
        this.ukupno = ukupno;
    }
}
