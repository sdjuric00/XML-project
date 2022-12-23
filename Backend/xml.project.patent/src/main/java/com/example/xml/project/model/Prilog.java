package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="prilog", propOrder={"opis"}, namespace = "http://ftn.ac.rs/a")
public class Prilog {

    @XmlAttribute(name="putanja", required = true)
    private String putanja;

    @XmlElement(name="opis", required = true, namespace = "http://ftn.ac.rs/a")
    private String opis;

    public String getPutanja() {
        return putanja;
    }

    public void setPutanja(String putanja) {
        this.putanja = putanja;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
}
