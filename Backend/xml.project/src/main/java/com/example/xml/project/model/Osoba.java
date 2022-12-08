package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlTransient
@XmlSeeAlso({
    FizickoLice.class,
    PravnoLice.class
})
public abstract class Osoba {

    protected Adresa adresa;
    protected Kontakt kontakt;

    public void setAdresa(Adresa adresa) {
        this.adresa = adresa;
    }

    public Adresa getAdresa() {
        return adresa;
    }

    public Kontakt getKontakt() {
        return kontakt;
    }

    public void setKontakt(Kontakt kontakt) {
        this.kontakt = kontakt;
    }
}
