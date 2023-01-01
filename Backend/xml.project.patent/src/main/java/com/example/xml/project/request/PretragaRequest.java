package com.example.xml.project.request;

import com.example.xml.project.model.P1.Naziv;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="pretraga")
@XmlType(name="pretraga", propOrder = {"parametriPretrage"})
@XmlAccessorType(XmlAccessType.PROPERTY)
public class PretragaRequest {


    private List<ParametarPretrage> parametriPretrage = new ArrayList<>();

    @XmlElementWrapper(name="parametriPretrage")
    @XmlElement(name="parametar")
    public List<ParametarPretrage> getParametriPretrage() {
        return parametriPretrage;
    }

    public void setParametriPretrage(List<ParametarPretrage> parametriPretrage) {
        this.parametriPretrage = parametriPretrage;
    }
}
