package com.example.xml.project.request;

import javax.validation.constraints.NotBlank;
import javax.xml.bind.annotation.*;

@XmlRootElement(name="datumi")
@XmlType(name="datumi", propOrder = {"pocetni_datum", "krajnji_datum"})
@XmlAccessorType(XmlAccessType.PROPERTY)
public class OpsegDatumaRequest {

    @NotBlank(message = "Mora da postoji početni datum.")
    private String pocetni_datum;

    @NotBlank(message = "Mora da postoji krajnji datum.")
    private String krajnji_datum;

    public OpsegDatumaRequest() {
    }

    public OpsegDatumaRequest(String pocetni_datum, String krajnji_datum) {
        this.pocetni_datum = pocetni_datum;
        this.krajnji_datum = krajnji_datum;
    }

    @XmlElement(name="pocetni_datum")
    public String getPocetni_datum() {
        return pocetni_datum;
    }

    public void setPocetni_datum(String pocetni_datum) {
        this.pocetni_datum = pocetni_datum;
    }

    @XmlElement(name="krajnji_datum")
    public String getKrajnji_datum() {
        return krajnji_datum;
    }

    public void setKrajnji_datum(String krajnji_datum) {
        this.krajnji_datum = krajnji_datum;
    }
}

