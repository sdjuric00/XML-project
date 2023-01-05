package com.example.xml.project.request;

import javax.xml.bind.annotation.*;
import java.util.List;

@XmlRootElement(name="napredna_pretraga")
@XmlType(name="pretraga", propOrder = {"parametriPretrage"})
@XmlAccessorType(XmlAccessType.PROPERTY)
public class NaprednaPretragaRequest {


    private List<ParNaprednaPretraga> parametriPretrage;

    @XmlElementWrapper(name="parametriPretrage")
    @XmlElement(name="par")
    public List<ParNaprednaPretraga> getParametriPretrage() {
        return parametriPretrage;
    }

    public void setParametriPretrage(List<ParNaprednaPretraga> parametriPretrage) {
        this.parametriPretrage = parametriPretrage;
    }
}
