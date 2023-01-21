package com.example.xml.project.dto;

import com.example.xml.project.model.*;
import com.example.xml.project.model.Z1.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@XmlRootElement(name="zahtev_za_priznanje_ziga")
public class ZahtevZigDetaljneInformacijeDTO {

    private String id;
    private String broj_prijave;
    private LocalDate datum_podnosenja;
    private boolean pregledano = false;
    private String referenca_na_resenje = "-1";
    private String vrsta_ziga;
    private String referenca_na_podnosioca;
    private Institucija institucija;
    private Punomocnik punomocnik;
    private PodaciOZajednickomPredstavniku podaci_o_zajednickom_predstavniku;
    private Znak znak;
    private PlaceneTakse placene_takse;
    private PravoPrvenstva pravo_prvenstva;
    private Prilozi prilozi;
    private List<Podnosilac> podnosioci;
    private List<OdabraneKategorije> nicanska_klasifikacija = new ArrayList<>();
    private PopunjavaZavod popunjava_zavod;

    public ZahtevZigDetaljneInformacijeDTO() {
    }

    public ZahtevZigDetaljneInformacijeDTO(final ZahtevZig zahtevZig) {
        this.id = zahtevZig.getId();
        this.broj_prijave = zahtevZig.getBroj_prijave();
        this.datum_podnosenja = zahtevZig.getDatum_podnosenja();
        this.pregledano = zahtevZig.isPregledano();
        this.referenca_na_resenje = zahtevZig.getReferenca_na_resenje();
        this.vrsta_ziga = zahtevZig.getZig().toString();
        this.referenca_na_podnosioca = zahtevZig.getReferenca_na_podnosioca();
        this.institucija = zahtevZig.getInstitucija();
        this.podnosioci = zahtevZig.getPodnosioci();
        this.punomocnik = zahtevZig.getPunomocnik();
        this.podaci_o_zajednickom_predstavniku = zahtevZig.getPodaci_o_zajednickom_predstavniku();
        this.znak = zahtevZig.getZnak();
        this.placene_takse = zahtevZig.getPlacene_takse();
        this.pravo_prvenstva = zahtevZig.getPravo_prvenstva();
        this.prilozi = zahtevZig.getPrilozi();
        this.nicanska_klasifikacija = zahtevZig.getNicanska_klasifikacija();
        if (zahtevZig.getPopunjava_zavod() == null){
            this.popunjava_zavod = new PopunjavaZavod();
        }
        else {
            this.popunjava_zavod = zahtevZig.getPopunjava_zavod();
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBroj_prijave() {
        return broj_prijave;
    }

    public void setBroj_prijave(String broj_prijave) {
        this.broj_prijave = broj_prijave;
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
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

    public String getVrsta_ziga() {
        return vrsta_ziga;
    }

    public void setVrsta_ziga(String vrsta_ziga) {
        this.vrsta_ziga = vrsta_ziga;
    }

    public Institucija getInstitucija() {
        return institucija;
    }

    public void setInstitucija(Institucija institucija) {
        this.institucija = institucija;
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

    public PlaceneTakse getPlacene_takse() {
        return placene_takse;
    }

    public void setPlacene_takse(PlaceneTakse placene_takse) {
        this.placene_takse = placene_takse;
    }

    public PravoPrvenstva getPravo_prvenstva() {
        return pravo_prvenstva;
    }

    public void setPravo_prvenstva(PravoPrvenstva pravo_prvenstva) {
        this.pravo_prvenstva = pravo_prvenstva;
    }

    public Prilozi getPrilozi() {
        return prilozi;
    }

    public void setPrilozi(Prilozi prilozi) {
        this.prilozi = prilozi;
    }

    public List<Podnosilac> getPodnosioci() {
        return podnosioci;
    }

    public void setPodnosioci(List<Podnosilac> podnosioci) {
        this.podnosioci = podnosioci;
    }

    public List<OdabraneKategorije> getNicanska_klasifikacija() {
        return nicanska_klasifikacija;
    }

    public void setNicanska_klasifikacija(List<OdabraneKategorije> nicanska_klasifikacija) {
        this.nicanska_klasifikacija = nicanska_klasifikacija;
    }

    public String getReferenca_na_resenje() {
        return referenca_na_resenje;
    }

    public void setReferenca_na_resenje(String referenca_na_resenje) {
        this.referenca_na_resenje = referenca_na_resenje;
    }

    public PopunjavaZavod getPopunjava_zavod() {
        return popunjava_zavod;
    }

    public void setPopunjava_zavod(PopunjavaZavod popunjava_zavod) {
        this.popunjava_zavod = popunjava_zavod;
    }

    public String getReferenca_na_podnosioca() {
        return referenca_na_podnosioca;
    }

    public void setReferenca_na_podnosioca(String referenca_na_podnosioca) {
        this.referenca_na_podnosioca = referenca_na_podnosioca;
    }
}
