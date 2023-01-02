package com.example.xml.project.model.Z1.resenje;

import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.util.IdentifiableEntity;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

@XmlRootElement(name="resenje")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="resenje",
    propOrder={"datum_obrade", "ime_prezime_sluzbenika", "sifra_obradjenog_zahteva", "razlog_odbijanja"}
)
public class Resenje implements IdentifiableEntity {

    @XmlAttribute(name="id", required = true)
    private String id;

    @XmlAttribute(name="referenca_na_zahtev", required = true)
    private String referenca_na_zahtev;

    @XmlElement(name="datum_obrade", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate datum_obrade;

    @XmlElement(name="ime_prezime_sluzbenika", required = true)
    private String ime_prezime_sluzbenika;

    @XmlElement(name="razlog_odbijanja")
    private String razlog_odbijanja;

    @XmlElement(name="sifra_obradjenog_zahteva")
    private String sifra_obradjenog_zahteva;

    public static Resenje napraviResenjeZaPrihvatanjeZahteva(
        final String referenca_na_zahtev,
        final String ime_prezime_sluzbenika,
        final String sifra_obradjenog_zahteva
    ){
        Resenje resenje = new Resenje();
        resenje.setDatum_obrade(LocalDate.now());
        resenje.setReferenca_na_zahtev(referenca_na_zahtev);
        resenje.setIme_prezime_sluzbenika(ime_prezime_sluzbenika);
        resenje.setSifra_obradjenog_zahteva(sifra_obradjenog_zahteva);
        return resenje;
    }

    public static Resenje napraviResenjeZaOdbijanjeZahteva(
        final String referenca_na_zahtev,
        final String ime_prezime_sluzbenika,
        final String razlog_odbijanja
    ){
        Resenje resenje = new Resenje();
        resenje.setDatum_obrade(LocalDate.now());
        resenje.setReferenca_na_zahtev(referenca_na_zahtev);
        resenje.setIme_prezime_sluzbenika(ime_prezime_sluzbenika);
        resenje.setRazlog_odbijanja(razlog_odbijanja);
        return resenje;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getReferenca_na_zahtev() {
        return referenca_na_zahtev;
    }

    public void setReferenca_na_zahtev(String referenca_na_zahtev) {
        this.referenca_na_zahtev = referenca_na_zahtev;
    }

    public LocalDate getDatum_obrade() {
        return datum_obrade;
    }

    public void setDatum_obrade(LocalDate datum_obrade) {
        this.datum_obrade = datum_obrade;
    }

    public String getIme_prezime_sluzbenika() {
        return ime_prezime_sluzbenika;
    }

    public void setIme_prezime_sluzbenika(String ime_prezime_sluzbenika) {
        this.ime_prezime_sluzbenika = ime_prezime_sluzbenika;
    }

    public String getRazlog_odbijanja() {
        return razlog_odbijanja;
    }

    public void setRazlog_odbijanja(String razlog_odbijanja) {
        this.razlog_odbijanja = razlog_odbijanja;
    }

    public String getSifra_obradjenog_zahteva() {
        return sifra_obradjenog_zahteva;
    }

    public void setSifra_obradjenog_zahteva(String sifra_obradjenog_zahteva) {
        this.sifra_obradjenog_zahteva = sifra_obradjenog_zahteva;
    }

    public String getBroj_prijave() {
        return null;
    }

    public void setBroj_prijave(String broj_prijave) {

    }
}
