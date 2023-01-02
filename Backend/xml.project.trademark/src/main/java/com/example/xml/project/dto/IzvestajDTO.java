package com.example.xml.project.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="izvestaj")
public class IzvestajDTO {

    private int ukupan_broj;
    private int broj_prihvacenih;
    private int broj_odbijenih;
    private int broj_nepregledanih;

    public IzvestajDTO() {
    }

    public IzvestajDTO(int ukupan_broj, int broj_prihvacenih, int broj_odbijenih, int broj_nepregledanih) {
        this.ukupan_broj = ukupan_broj;
        this.broj_prihvacenih = broj_prihvacenih;
        this.broj_odbijenih = broj_odbijenih;
        this.broj_nepregledanih = broj_nepregledanih;
    }

    public int getUkupan_broj() {
        return ukupan_broj;
    }

    public void setUkupan_broj(int ukupan_broj) {
        this.ukupan_broj = ukupan_broj;
    }

    public int getBroj_prihvacenih() {
        return broj_prihvacenih;
    }

    public void setBroj_prihvacenih(int broj_prihvacenih) {
        this.broj_prihvacenih = broj_prihvacenih;
    }

    public int getBroj_odbijenih() {
        return broj_odbijenih;
    }

    public void setBroj_odbijenih(int broj_odbijenih) {
        this.broj_odbijenih = broj_odbijenih;
    }

    public int getBroj_nepregledanih() {
        return broj_nepregledanih;
    }

    public void setBroj_nepregledanih(int broj_nepregledanih) {
        this.broj_nepregledanih = broj_nepregledanih;
    }
}
