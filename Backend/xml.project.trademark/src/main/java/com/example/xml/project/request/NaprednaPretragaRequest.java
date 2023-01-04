package com.example.xml.project.request;

import javax.xml.bind.annotation.*;
import java.util.List;

@XmlRootElement(name="napredna_pretraga")
@XmlType(name="pretraga", propOrder = {"naziv_elementa", "parametriPretrage"})
@XmlAccessorType(XmlAccessType.PROPERTY)
public class NaprednaPretragaRequest {

    @XmlElement(name="naziv_elementa", required = true)
    private String naziv_elementa;

    @XmlElementWrapper(name="parametriPretrage")
    @XmlElement(name="par")
    private List<ParNaprednaPretraga> parametriPretrage;

    public String getNaziv_elementa() {
        return naziv_elementa;
    }

    public void setNaziv_elementa(String naziv_elementa) {
        this.naziv_elementa = naziv_elementa;
    }

    public List<ParNaprednaPretraga> getParametriPretrage() {
        return parametriPretrage;
    }

    public void setParametriPretrage(List<ParNaprednaPretraga> parametriPretrage) {
        this.parametriPretrage = parametriPretrage;
    }
}
