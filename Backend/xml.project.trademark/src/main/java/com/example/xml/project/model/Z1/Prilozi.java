package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.*;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="prilozi", propOrder={"spisak_roba_i_usluga", "generalno_punomocje_ranije_prilozeno",
        "punomocje_ce_biti_naknadno_dostavljeno"},
        namespace = "http://www.zig/zig")
public class Prilozi {

    @XmlAttribute(name = "primerak_znaka_putanja", required = true)
    private String primerak_znaka_putanja;

    @XmlAttribute(name = "punomocje_putanja", required = true)
    private String punomocje_putanja;

    @XmlAttribute(name = "opsti_akt_o_kolektivnom_zigu_garancije_putanja", required = true)
    private String opsti_akt_o_kolektivnom_zigu_garancije_putanja;

    @XmlAttribute(name = "dokaz_o_pravu_prvenstva_putanja", required = true)
    private String dokaz_o_pravu_prvenstva_putanja;

    @XmlAttribute(name = "dokaz_o_uplati_takse_putanja", required = true)
    private String dokaz_o_uplati_takse_putanja;

    @XmlElementWrapper(name = "spisak_roba_i_usluga", namespace = "http://www.zig/zig")
    @XmlElement(name = "roba", namespace = "http://www.zig/zig")
    private List<Roba> spisak_roba_i_usluga;

    @XmlElement(name = "generalno_punomocje_ranije_prilozeno", required = true, namespace = "http://www.zig/zig")
    public boolean generalno_punomocje_ranije_prilozeno;

    @XmlElement(name = "punomocje_ce_biti_naknadno_dostavljeno", required = true, namespace = "http://www.zig/zig")
    private boolean punomocje_ce_biti_naknadno_dostavljeno;

    public String getPrimerak_znaka_putanja() {
        return primerak_znaka_putanja;
    }

    public void setPrimerak_znaka_putanja(String primerak_znaka_putanja) {
        this.primerak_znaka_putanja = primerak_znaka_putanja;
    }

    public String getPunomocje_putanja() {
        return punomocje_putanja;
    }

    public void setPunomocje_putanja(String punomocje_putanja) {
        this.punomocje_putanja = punomocje_putanja;
    }

    public String getOpsti_akt_o_kolektivnom_zigu_garancije_putanja() {
        return opsti_akt_o_kolektivnom_zigu_garancije_putanja;
    }

    public void setOpsti_akt_o_kolektivnom_zigu_garancije_putanja(String opsti_akt_o_kolektivnom_zigu_garancije_putanja) {
        this.opsti_akt_o_kolektivnom_zigu_garancije_putanja = opsti_akt_o_kolektivnom_zigu_garancije_putanja;
    }

    public String getDokaz_o_pravu_prvenstva_putanja() {
        return dokaz_o_pravu_prvenstva_putanja;
    }

    public void setDokaz_o_pravu_prvenstva_putanja(String dokaz_o_pravu_prvenstva_putanja) {
        this.dokaz_o_pravu_prvenstva_putanja = dokaz_o_pravu_prvenstva_putanja;
    }

    public String getDokaz_o_uplati_takse_putanja() {
        return dokaz_o_uplati_takse_putanja;
    }

    public void setDokaz_o_uplati_takse_putanja(String dokaz_o_uplati_takse_putanja) {
        this.dokaz_o_uplati_takse_putanja = dokaz_o_uplati_takse_putanja;
    }

    public List<Roba> getSpisak_roba_i_usluga() {
        return spisak_roba_i_usluga;
    }

    public void setSpisak_roba_i_usluga(List<Roba> spisak_roba_i_usluga) {
        this.spisak_roba_i_usluga = spisak_roba_i_usluga;
    }

    public boolean isGeneralno_punomocje_ranije_prilozeno() {
        return generalno_punomocje_ranije_prilozeno;
    }

    public void setGeneralno_punomocje_ranije_prilozeno(boolean generalno_punomocje_ranije_prilozeno) {
        this.generalno_punomocje_ranije_prilozeno = generalno_punomocje_ranije_prilozeno;
    }

    public boolean isPunomocje_ce_biti_naknadno_dostavljeno() {
        return punomocje_ce_biti_naknadno_dostavljeno;
    }

    public void setPunomocje_ce_biti_naknadno_dostavljeno(boolean punomocje_ce_biti_naknadno_dostavljeno) {
        this.punomocje_ce_biti_naknadno_dostavljeno = punomocje_ce_biti_naknadno_dostavljeno;
    }
}
