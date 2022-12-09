package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="placene_takse", propOrder={"valuta", "osnovna_taksa", "taksa_za_klasu", "taksa_za_graficko_resenje", "ukupno"}, namespace = "http://www.zig/zig")
public class PlaceneTakse {

    @XmlElement(name = "valuta", required = true, namespace = "http://www.zig/zig")
    private String valuta;

    @XmlElement(name = "osnovna_taksa", required = true, namespace = "http://www.zig/zig")
    private double osnovna_taksa = 0;

    @XmlElement(name = "taksa_za_klasu", required = true, namespace = "http://www.zig/zig")
    private double taksa_za_klasu = 0;

    @XmlElement(name = "taksa_za_graficko_resenje", required = true, namespace = "http://www.zig/zig")
    private double taksa_za_graficko_resenje = 0;

    @XmlElement(name = "ukupno", required = true, namespace = "http://www.zig/zig")
    private double ukupno;

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
