package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="prilozi", propOrder={"opis", "primerak"}, namespace = "http://ftn.ac.rs/a")
public class Prilozi {

    @XmlElement(name="opis", required = true, namespace = "http://ftn.ac.rs/a")
    private String opis;

    @XmlElement(name="primerak", required = true, namespace = "http://ftn.ac.rs/a")
    private String primerak;

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getPrimerak() {
        return primerak;
    }

    public void setPrimerak(String primerak) {
        this.primerak = primerak;
    }
}
