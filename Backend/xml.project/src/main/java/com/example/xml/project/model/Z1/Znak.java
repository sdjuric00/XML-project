package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.*;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="znak", propOrder={"vrsta_znaka", "boje", "transliteracija_znaka", "prevod", "opis"}, namespace = "http://www.zig/zig")
public class Znak {

    @XmlAttribute(name = "pismo", required = true)
    private String pismo;

    @XmlAttribute(name = "putanja", required = true)
    private String putanja;

    @XmlElement(name = "vrsta_znaka", required = true, namespace = "http://www.zig/zig")
    private VrstaZnaka vrsta_znaka;

    @XmlElementWrapper(name = "boje", namespace = "http://www.zig/zig")
    @XmlElement(name = "boja", namespace = "http://www.zig/zig")
    private List<Boja> boje;

    @XmlElement(name = "transliteracija_znaka", required = false, namespace = "http://www.zig/zig")
    private String transliteracija_znaka;

    @XmlElement(name = "prevod", required = false, namespace = "http://www.zig/zig")
    private String prevod;

    @XmlElement(name = "opis", required = true, namespace = "http://www.zig/zig")
    private String opis;

    public String getPismo() {
        return pismo;
    }

    public void setPismo(String pismo) {
        this.pismo = pismo;
    }

    public String getPutanja() {
        return putanja;
    }

    public void setPutanja(String putanja) {
        this.putanja = putanja;
    }

    public VrstaZnaka getVrsta_znaka() {
        return vrsta_znaka;
    }

    public void setVrsta_znaka(VrstaZnaka vrsta_znaka) {
        this.vrsta_znaka = vrsta_znaka;
    }

    public List<Boja> getBoje() {
        return boje;
    }

    public void setBoje(List<Boja> boje) {
        this.boje = boje;
    }

    public String getTransliteracija_znaka() {
        return transliteracija_znaka;
    }

    public void setTransliteracija_znaka(String transliteracija_znaka) {
        this.transliteracija_znaka = transliteracija_znaka;
    }

    public String getPrevod() {
        return prevod;
    }

    public void setPrevod(String prevod) {
        this.prevod = prevod;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
}
