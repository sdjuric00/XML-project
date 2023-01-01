package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="prilozi", propOrder={"opis", "primerak"}, namespace = "http://ftn.ac.rs/a")
public class Prilozi {

    @XmlAttribute(name="opis_prilozen", required = true)
    private boolean opis_prilozen = false;

    @XmlAttribute(name="primerak_prilozen", required = true)
    private boolean primerak_prilozen = false;

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

    public boolean isOpis_prilozen() {
        return opis_prilozen;
    }

    public void setOpis_prilozen(boolean opis_prilozen) {
        this.opis_prilozen = opis_prilozen;
    }

    public boolean isPrimerak_prilozen() {
        return primerak_prilozen;
    }

    public void setPrimerak_prilozen(boolean primerak_prilozen) {
        this.primerak_prilozen = primerak_prilozen;
    }
}
