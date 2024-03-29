package com.example.xml.project.model.P1;

import com.example.xml.project.model.FizickoLice;
import com.example.xml.project.model.PravnoLice;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="punomocnik", propOrder={"pronalazac_osoba"})
public class PunomocnikP {
    @XmlAttribute(name="za_zastupanje", required = true)
    private boolean za_zastupanje;

    @XmlAttribute(name="za_prijem_pismeno", required = true)
    private boolean za_prijem_pismeno;
    @XmlElements(value = {
            @XmlElement(name="fizicko_lice",
                    type= FizickoLice.class, namespace = "http://www.patent/patent"),
            @XmlElement(name="pravno_lice",
                    type= PravnoLice.class, namespace = "http://www.patent/patent")
    })
    private Object pronalazac_osoba;

    public Object getPronalazac_osoba() {
        return pronalazac_osoba;
    }

    public void setPronalazac_osoba(Object pronalazac_osoba) {
        this.pronalazac_osoba = pronalazac_osoba;
    }

    public boolean isZa_zastupanje() {
        return za_zastupanje;
    }

    public void setZa_zastupanje(boolean za_zastupanje) {
        this.za_zastupanje = za_zastupanje;
    }

    public boolean isZa_prijem_pismeno() {
        return za_prijem_pismeno;
    }

    public void setZa_prijem_pismeno(boolean za_prijem_pismeno) {
        this.za_prijem_pismeno = za_prijem_pismeno;
    }
}
