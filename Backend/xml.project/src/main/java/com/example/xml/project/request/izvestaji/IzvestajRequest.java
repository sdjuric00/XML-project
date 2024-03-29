package com.example.xml.project.request.izvestaji;

import javax.xml.bind.annotation.*;
import java.util.List;

@XmlRootElement(name="izvestaj", namespace = "http://ftn.ac.rs/izvestaj")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="izvestaj", propOrder={"izvestaji", "pocetni_datum", "krajnji_datum"}, namespace = "http://ftn.ac.rs/izvestaj")
public class IzvestajRequest {

    @XmlElementWrapper(name="izvestaji", namespace = "http://ftn.ac.rs/izvestaj")
    @XmlElement(name="izvestaj_podaci", namespace = "http://ftn.ac.rs/izvestaj")
    private List<IzvestajPodaci> izvestaji;

    @XmlElement(name="pocetni_datum", namespace = "http://ftn.ac.rs/izvestaj")
    private String pocetni_datum;

    @XmlElement(name="krajnji_datum", namespace = "http://ftn.ac.rs/izvestaj")
    private String krajnji_datum;

    public IzvestajRequest() {

    }

    public IzvestajRequest(
            final List<IzvestajPodaci> izvestaji,
            final String pocetni_datum,
            final String krajnji_datum
    ) {
        this.izvestaji = izvestaji;
        this.pocetni_datum = pocetni_datum;
        this.krajnji_datum = krajnji_datum;
    }

    public List<IzvestajPodaci> getIzvestaji() {
        return izvestaji;
    }

    public void setIzvestaji(List<IzvestajPodaci> izvestaji) {
        this.izvestaji = izvestaji;
    }

    public String getPocetni_datum() {
        return pocetni_datum;
    }

    public void setPocetni_datum(String pocetni_datum) {
        this.pocetni_datum = pocetni_datum;
    }

    public String getKrajnji_datum() {
        return krajnji_datum;
    }

    public void setKrajnji_datum(String krajnji_datum) {
        this.krajnji_datum = krajnji_datum;
    }
}
