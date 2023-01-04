package com.example.xml.project.request.izvestaji;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="izvestaj_podaci", propOrder={"broj_nepregledanih", "broj_odbijenih", "broj_prihvacenih", "ukupan_broj"})
public class IzvestajPodaci {

    @XmlAttribute(name="tip_izvestaja", required = true)
    private String tip_izvestaja;

    @XmlElement(name="broj_nepregledanih", required = true)
    private String broj_nepregledanih;

    @XmlElement(name="broj_odbijenih", required = true)
    private String broj_odbijenih;

    @XmlElement(name="broj_prihvacenih", required = true)
    private String broj_prihvacenih;

    @XmlElement(name="ukupan_broj", required = true)
    private String ukupan_broj;

    public IzvestajPodaci() {

    }

    public IzvestajPodaci(
            final String tip_izvestaja,
            final String broj_nepregledanih,
            final String broj_odbijenih,
            final String broj_prihvacenih,
            final String ukupan_broj
    ) {
        this.tip_izvestaja = tip_izvestaja;
        this.broj_nepregledanih = broj_nepregledanih;
        this.broj_odbijenih = broj_odbijenih;
        this.broj_prihvacenih = broj_prihvacenih;
        this.ukupan_broj = ukupan_broj;
    }

    public String getTip_izvestaja() {
        return tip_izvestaja;
    }

    public void setTip_izvestaja(String tip_izvestaja) {
        this.tip_izvestaja = tip_izvestaja;
    }

    public String getBroj_nepregledanih() {
        return broj_nepregledanih;
    }

    public void setBroj_nepregledanih(String broj_nepregledanih) {
        this.broj_nepregledanih = broj_nepregledanih;
    }

    public String getBroj_odbijenih() {
        return broj_odbijenih;
    }

    public void setBroj_odbijenih(String broj_odbijenih) {
        this.broj_odbijenih = broj_odbijenih;
    }

    public String getBroj_prihvacenih() {
        return broj_prihvacenih;
    }

    public void setBroj_prihvacenih(String broj_prihvacenih) {
        this.broj_prihvacenih = broj_prihvacenih;
    }

    public String getUkupan_broj() {
        return ukupan_broj;
    }

    public void setUkupan_broj(String ukupan_broj) {
        this.ukupan_broj = ukupan_broj;
    }
}
