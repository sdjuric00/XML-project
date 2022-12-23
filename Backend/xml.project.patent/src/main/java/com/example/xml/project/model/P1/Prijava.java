package com.example.xml.project.model.P1;

import com.example.xml.project.model.LocalDateAdapter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="prijava",
        propOrder={"datum_podnosenja_prijave","broj_ranije_prijave","dvoslovna_oznaka_drzave" },
        namespace = "http://www.patent/patent"
)
public class Prijava {
    @XmlElement(name="datum_podnosenja_prijave", required = true, namespace = "http://www.patent/patent")
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate datum_podnosenja_prijave;
    @XmlElement(name="broj_ranije_prijave", required = true, namespace = "http://www.patent/patent")
    private String broj_ranije_prijave;
    @XmlElement(name="dvoslovna_oznaka_drzave", required = true, namespace = "http://www.patent/patent")
    private String dvoslovna_oznaka_drzave;

    public LocalDate getDatum_podnosenja_prijave() {
        return datum_podnosenja_prijave;
    }

    public void setDatum_podnosenja_prijave(LocalDate datum_podnosenja_prijave) {
        this.datum_podnosenja_prijave = datum_podnosenja_prijave;
    }

    public String getBroj_ranije_prijave() {
        return broj_ranije_prijave;
    }

    public void setBroj_ranije_prijave(String broj_ranije_prijave) {
        this.broj_ranije_prijave = broj_ranije_prijave;
    }

    public String getDvoslovna_oznaka_drzave() {
        return dvoslovna_oznaka_drzave;
    }

    public void setDvoslovna_oznaka_drzave(String dvoslovna_oznaka_drzave) {
        this.dvoslovna_oznaka_drzave = dvoslovna_oznaka_drzave;
    }
}
