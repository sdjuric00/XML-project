package com.example.xml.project.request;

import javax.xml.bind.annotation.XmlTransient;

@XmlTransient
public abstract class OsobaRequest {

    protected AdresaRequest adresa;
    protected KontaktRequest kontakt;

    public void setAdresa(AdresaRequest adresa) {
        this.adresa = adresa;
    }

    public AdresaRequest getAdresa() {
        return adresa;
    }

    public KontaktRequest getKontakt() {
        return kontakt;
    }

    public void setKontakt(KontaktRequest kontakt) {
        this.kontakt = kontakt;
    }
}