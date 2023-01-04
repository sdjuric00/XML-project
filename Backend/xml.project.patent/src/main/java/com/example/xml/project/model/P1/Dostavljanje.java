package com.example.xml.project.model.P1;

import com.example.xml.project.model.Adresa;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="dostavljanje",
        propOrder={"adresa"},
        namespace = "http://www.patent/patent"
)
public class Dostavljanje {

    @XmlAttribute(name="elektronski", required = true)
    private boolean elektronski;
    @XmlAttribute(name="pismeno", required = true)
    private boolean pismeno;
    @XmlElement(name="adresa", required = true, namespace = "http://www.patent/patent")
    private Adresa adresa;

    public boolean isElektronski() {
        return elektronski;
    }

    public void setElektronski(boolean elektronski) {
        this.elektronski = elektronski;
    }

    public boolean isPismeno() {
        return pismeno;
    }

    public void setPismeno(boolean pismeno) {
        this.pismeno = pismeno;
    }

    public Adresa getAdresa() {
        return adresa;
    }

    public void setAdresa(Adresa adresa) {
        this.adresa = adresa;
    }
}
