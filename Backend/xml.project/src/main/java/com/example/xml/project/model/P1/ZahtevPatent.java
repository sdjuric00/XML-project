package com.example.xml.project.model.P1;

import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.LocalDateAdapter;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Punomocnik;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="zahtev_za_priznavanje_patenta",
        propOrder={"institucija", "podaci_o_pronalasku", "podnosilac", "pronalazac", "punomocnik", "dostavljanje", "zahtev_za_priznanje_prava_iz_ranijih_prijava"},
        namespace = "http://www.patent/patent"
)
public class ZahtevPatent {

    @XmlAttribute(name="broj_prijave", required = true)
    public String broj_prijave;

    @XmlAttribute(name="datum_prijema", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate datum_prijema;

    @XmlAttribute(name="priznati_datum_podnosenja", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate priznati_datum_podnosenja;

    @XmlAttribute(name="pregledano", required = true)
    public boolean dopunska_prijava;

    @XmlElement(name="institucija", required = true, namespace = "http://www.patent/patent")
    public Institucija institucija;

    @XmlElementWrapper(name="podaci_o_pronalasku", namespace = "http://www.patent/patent")
    @XmlElement(name="naziv", namespace = "http://www.patent/patent")
    public List<Naziv> podaci_o_pronalasku;

    @XmlElement(name="podnosilac", required = true, namespace = "http://www.patent/patent")
    public Podnosilac podnosilac;

    @XmlElement(name="pronalazac", required = true, namespace = "http://www.patent/patent")
    public PronalazacP pronalazac;

    @XmlElement(name="punomocnik", required = true, namespace = "http://www.patent/patent")
    public PunomocnikP punomocnik;

    @XmlElement(name="dostavljanje", required = true, namespace = "http://www.patent/patent")
    public Dostavljanje dostavljanje;

    @XmlElementWrapper(name="zahtev_za_priznanje_prava_iz_ranijih_prijava", namespace = "http://www.patent/patent")
    @XmlElement(name="prijava", required = true, namespace = "http://www.patent/patent")
    public List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava = new ArrayList<>();
}
