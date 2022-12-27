package com.example.xml.project.request;


import com.example.xml.project.model.Adresa;
import com.example.xml.project.model.Kontakt;
import com.example.xml.project.model.Korisnici.TipNaloga;
import com.example.xml.project.model.Osoba;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.xml.bind.annotation.*;

import static com.example.xml.project.exception.ErrorMessagesConstants.*;
import static com.example.xml.project.util.Constants.ISPRAVNA_LOZINKA_REG;
import static com.example.xml.project.util.Constants.ISPRAVNO_IME_REG;

@XmlRootElement(name="korisnik", namespace = "http://www.korisnici/korisnici")
@XmlAccessorType(XmlAccessType.PROPERTY)
@XmlType(name="korisnik", propOrder={"kontakt", "adresa", "ime", "prezime", "lozinka", "potvrdna_lozinka", "tip_naloga"}, namespace = "http://www.korisnici/korisnici")
public class KorisnikRequest extends OsobaRequest {

    @NotBlank(message = POGRESNO_IME_MESSAGE)
    @Pattern(regexp = ISPRAVNO_IME_REG, message = POGRESNO_IME_MESSAGE)
    private String ime;
    @NotBlank(message = POGRESNO_PREZIME_MESSAGE)
    @Pattern(regexp = ISPRAVNO_IME_REG, message = POGRESNO_PREZIME_MESSAGE)
    private String prezime;
    @NotBlank(message = POGRESNA_LOZINKA)
    @Pattern(regexp = ISPRAVNA_LOZINKA_REG, message = POGRESNA_LOZINKA)
    private String lozinka;
    @NotBlank(message = POGRESNA_LOZINKA)
    @Pattern(regexp = ISPRAVNA_LOZINKA_REG, message = POGRESNA_LOZINKA)
    private String potvrdna_lozinka;

    @NotNull(message = "Tip naloga mora biti naveden.")
    private TipNaloga tip_naloga;

    @Valid
    @Override
    @XmlElement(name="adresa", required = true, namespace = "http://ftn.ac.rs/opste")
    public AdresaRequest getAdresa() {
        return super.adresa;
    }
    @Override
    public void setAdresa(AdresaRequest adresa) {
        this.adresa = adresa;
    }

    @Valid
    @Override
    @XmlElement(name="kontakt", required = true, namespace = "http://ftn.ac.rs/opste")
    public KontaktRequest getKontakt() {
        return super.kontakt;
    }
    @Override
    public void setKontakt(KontaktRequest kontakt) {
        this.kontakt = kontakt;
    }

    @XmlElement(name="ime", required = true, namespace = "http://www.korisnici/korisnici")
    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    @XmlElement(name="prezime", required = true, namespace = "http://www.korisnici/korisnici")
    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    @XmlElement(name="lozinka", required = true, namespace = "http://www.korisnici/korisnici")
    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    @XmlElement(name="potvrdna_lozinka", required = true, namespace = "http://www.korisnici/korisnici")
    public String getPotvrdna_lozinka() {
        return potvrdna_lozinka;
    }

    public void setPotvrdna_lozinka(String potvrdna_lozinka) {
        this.potvrdna_lozinka = potvrdna_lozinka;
    }

    @XmlElement(name="tip_naloga", required = true, namespace = "http://www.korisnici/korisnici")
    public TipNaloga getTip_naloga() {
        return tip_naloga;
    }

    public void setTip_naloga(TipNaloga tip_naloga) {
        this.tip_naloga = tip_naloga;
    }

}
