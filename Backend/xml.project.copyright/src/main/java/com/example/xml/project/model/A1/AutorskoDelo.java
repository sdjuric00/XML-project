package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="autorsko_delo", propOrder={"vrsta_autorskog_dela", "forma_zapisa", "naslov", "alternativni_naslov", "podaci_o_naslovu_prerada"})
public class AutorskoDelo {

    @XmlAttribute(name="stvoreno_u_radnom_odnosu", required = true)
    private boolean stvoreno_u_radnom_odnosu;

    @XmlAttribute(name="nacin_koriscenja", required = true)
    private String nacin_koriscenja;

    @XmlElement(name="vrsta_autorskog_dela", required = true,  namespace = "http://ftn.ac.rs/a")
    private VrstaAutorskogDela vrsta_autorskog_dela;

    @XmlElement(name="forma_zapisa", required = true, namespace = "http://ftn.ac.rs/a")
    private FormaZapisa forma_zapisa;

    @XmlElement(name="naslov", required = true, namespace = "http://ftn.ac.rs/a")
    private String naslov;

    @XmlElement(name="alternativni_naslov", required = false, namespace = "http://ftn.ac.rs/a")
    private String alternativni_naslov;

    @XmlElement(name="podaci_o_naslovu_prerada", required = false, namespace = "http://ftn.ac.rs/a")
    private PodaciONaslovuPrerada podaci_o_naslovu_prerada;

    public boolean isStvoreno_u_radnom_odnosu() {
        return stvoreno_u_radnom_odnosu;
    }

    public void setStvoreno_u_radnom_odnosu(boolean stvoreno_u_radnom_odnosu) {
        this.stvoreno_u_radnom_odnosu = stvoreno_u_radnom_odnosu;
    }

    public String getNacin_koriscenja() {
        return nacin_koriscenja;
    }

    public void setNacin_koriscenja(String nacin_koriscenja) {
        this.nacin_koriscenja = nacin_koriscenja;
    }

    public VrstaAutorskogDela getVrsta_autorskog_dela() {
        return vrsta_autorskog_dela;
    }

    public void setVrsta_autorskog_dela(VrstaAutorskogDela vrsta_autorskog_dela) {
        this.vrsta_autorskog_dela = vrsta_autorskog_dela;
    }

    public FormaZapisa getForma_zapisa() {
        return forma_zapisa;
    }

    public void setForma_zapisa(FormaZapisa forma_zapisa) {
        this.forma_zapisa = forma_zapisa;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getAlternativni_naslov() {
        return alternativni_naslov;
    }

    public void setAlternativni_naslov(String alternativni_naslov) {
        this.alternativni_naslov = alternativni_naslov;
    }

    public PodaciONaslovuPrerada getPodaci_o_naslovu_prerada() {
        return podaci_o_naslovu_prerada;
    }

    public void setPodaci_o_naslovu_prerada(PodaciONaslovuPrerada podaci_o_naslovu_prerada) {
        this.podaci_o_naslovu_prerada = podaci_o_naslovu_prerada;
    }
}
