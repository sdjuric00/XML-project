package com.example.xml.project.model.Z1;

import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Punomocnik;
import com.example.xml.project.model.Z1.enums.ZigEnum;
import com.example.xml.project.util.IdentifiableEntity;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="zahtev_za_priznanje_ziga", namespace = "http://www.zig/zig")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="zahtev_za_priznanje_ziga",
        propOrder={"institucija", "podnosioci", "punomocnik", "podaci_o_zajednickom_predstavniku", "znak", "nicanska_klasifikacija", "pravo_prvenstva", "placene_takse", "prilozi", "popunjava_zavod"},
        namespace = "http://www.zig/zig"
)
public class ZahtevZig implements IdentifiableEntity {

    @XmlAttribute(name = "id", required = true)
    private String id;

    @XmlAttribute(name = "broj_prijave", required = true)
    private String broj_prijave;

    @XmlJavaTypeAdapter(value = LocalDateAdapter.class)
    @XmlAttribute(name = "datum_podnosenja", required = true)
    private LocalDate datum_podnosenja;

    @XmlAttribute(name = "pregledano", required = true)
    private boolean pregledano = false;

    @XmlAttribute(name = "referenca_na_podnosioca", required = true)
    private String referenca_na_podnosioca;

    @XmlAttribute(name="prihvaceno")
    private boolean prihvaceno = false;

    @XmlAttribute(name = "referenca_na_resenje")
    private String referenca_na_resenje = "-1";

    @XmlAttribute(name = "zig", required = true)
    private ZigEnum zig;

    @XmlElement(name = "institucija", required = true, namespace = "http://www.zig/zig")
    private Institucija institucija;

    @XmlElementWrapper(name = "podnosioci", namespace = "http://www.zig/zig")
    @XmlElement(name = "podnosilac", namespace = "http://www.zig/zig")
    private List<Podnosilac> podnosioci;

    @XmlElement(name = "punomocnik", required = true, namespace = "http://www.zig/zig")
    private Punomocnik punomocnik;

    @XmlElement(name = "podaci_o_zajednickom_predstavniku", required = false, namespace = "http://www.zig/zig")
    private PodaciOZajednickomPredstavniku podaci_o_zajednickom_predstavniku;

    @XmlElement(name = "znak", required = true, namespace = "http://www.zig/zig")
    private Znak znak;

    @XmlElementWrapper(name = "nicanska_klasifikacija", namespace = "http://www.zig/zig")
    @XmlElement(name = "broj", namespace = "http://www.zig/zig", required = true)
    private List<OdabraneKategorije> nicanska_klasifikacija = new ArrayList<>();

    @XmlElement(name = "pravo_prvenstva", required = true, namespace = "http://www.zig/zig")
    private PravoPrvenstva pravo_prvenstva;

    @XmlElement(name = "placene_takse", required = true, namespace = "http://www.zig/zig")
    private PlaceneTakse placene_takse;

    @XmlElement(name = "prilozi", required = true, namespace = "http://www.zig/zig")
    private Prilozi prilozi;

    @XmlElement(name = "popunjava_zavod", namespace = "http://www.zig/zig")
    private PopunjavaZavod popunjava_zavod;

    public ZahtevZig() {

    }

    public ZahtevZig(final String id,
                     final String broj_prijave,
                     final LocalDate datum_podnosenja,
                     final boolean pregledano,
                     final String referenca_na_podnosioca,
                     final ZigEnum zig,
                     final Institucija institucija,
                     final List<Podnosilac> podnosioci,
                     final Punomocnik punomocnik,
                     final PodaciOZajednickomPredstavniku podaci_o_zajednickom_predstavniku,
                     final Znak znak,
                     final List<OdabraneKategorije> nicanska_klasifikacija,
                     final PravoPrvenstva pravo_prvenstva,
                     final PlaceneTakse placene_takse,
                     final Prilozi prilozi
    ) {
        this.id = id;
        this.broj_prijave = broj_prijave;
        this.datum_podnosenja = datum_podnosenja;
        this.pregledano = pregledano;
        this.referenca_na_podnosioca = referenca_na_podnosioca;
        this.zig = zig;
        this.institucija = institucija;
        this.podnosioci = podnosioci;
        this.punomocnik = punomocnik;
        this.podaci_o_zajednickom_predstavniku = podaci_o_zajednickom_predstavniku;
        this.znak = znak;
        this.nicanska_klasifikacija = nicanska_klasifikacija;
        this.pravo_prvenstva = pravo_prvenstva;
        this.placene_takse = placene_takse;
        this.prilozi = prilozi;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    public LocalDate getDatum_podnosenja() {
        return datum_podnosenja;
    }

    public void setDatum_podnosenja(LocalDate datum_podnosenja) {
        this.datum_podnosenja = datum_podnosenja;
    }

    public boolean isPregledano() {
        return pregledano;
    }

    public void setPregledano(boolean pregledano) {
        this.pregledano = pregledano;
    }

    public ZigEnum getZig() {
        return zig;
    }

    public void setZig(ZigEnum zig) {
        this.zig = zig;
    }

    public Institucija getInstitucija() {
        return institucija;
    }

    public void setInstitucija(Institucija institucija) {
        this.institucija = institucija;
    }

    public List<Podnosilac> getPodnosioci() {
        return podnosioci;
    }

    public void setPodnosioci(List<Podnosilac> podnosioci) {
        this.podnosioci = podnosioci;
    }

    public Punomocnik getPunomocnik() {
        return punomocnik;
    }

    public void setPunomocnik(Punomocnik punomocnik) {
        this.punomocnik = punomocnik;
    }

    public PodaciOZajednickomPredstavniku getPodaci_o_zajednickom_predstavniku() {
        return podaci_o_zajednickom_predstavniku;
    }

    public void setPodaci_o_zajednickom_predstavniku(PodaciOZajednickomPredstavniku podaci_o_zajednickom_predstavniku) {
        this.podaci_o_zajednickom_predstavniku = podaci_o_zajednickom_predstavniku;
    }

    public Znak getZnak() {
        return znak;
    }

    public void setZnak(Znak znak) {
        this.znak = znak;
    }

    public List<OdabraneKategorije> getNicanska_klasifikacija() {
        return nicanska_klasifikacija;
    }

    public void setNicanska_klasifikacija(List<OdabraneKategorije> nicanska_klasifikacija) {
        this.nicanska_klasifikacija = nicanska_klasifikacija;
    }

    public PravoPrvenstva getPravo_prvenstva() {
        return pravo_prvenstva;
    }

    public void setPravo_prvenstva(PravoPrvenstva pravo_prvenstva) {
        this.pravo_prvenstva = pravo_prvenstva;
    }

    public PlaceneTakse getPlacene_takse() {
        return placene_takse;
    }

    public void setPlacene_takse(PlaceneTakse placene_takse) {
        this.placene_takse = placene_takse;
    }

    public Prilozi getPrilozi() {
        return prilozi;
    }

    public void setPrilozi(Prilozi prilozi) {
        this.prilozi = prilozi;
    }

    public PopunjavaZavod getPopunjava_zavod() {
        return popunjava_zavod;
    }

    public void setPopunjava_zavod(PopunjavaZavod popunjava_zavod) {
        this.popunjava_zavod = popunjava_zavod;
    }

    public String getReferenca_na_resenje() {
        return referenca_na_resenje;
    }

    public void setReferenca_na_resenje(String referenca_na_resenje) {
        this.referenca_na_resenje = referenca_na_resenje;
    }

    public boolean isPrihvaceno() {
        return prihvaceno;
    }

    public void setPrihvaceno(boolean prihvaceno) {
        this.prihvaceno = prihvaceno;
    }

    public String getReferenca_na_podnosioca() {
        return referenca_na_podnosioca;
    }

    public void setReferenca_na_podnosioca(String referenca_na_podnosioca) {
        this.referenca_na_podnosioca = referenca_na_podnosioca;
    }
}
