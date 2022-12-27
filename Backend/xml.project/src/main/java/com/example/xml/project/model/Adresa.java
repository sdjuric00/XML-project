package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"grad", "ulica", "broj", "postanski_broj", "drzava"})
public class Adresa {

    @XmlElement(name="grad", required=true, namespace = "http://ftn.ac.rs/opste")
    private String grad;

    @XmlElement(name="ulica", required=true, namespace = "http://ftn.ac.rs/opste")
    private String ulica;

    @XmlElement(name="broj", required=true, namespace = "http://ftn.ac.rs/opste")
    private String broj;

    @XmlElement(name="postanski_broj", required=true, namespace = "http://ftn.ac.rs/opste")
    private int postanski_broj;

    @XmlElement(name="drzava", required=true, namespace = "http://ftn.ac.rs/opste")
    private String drzava;

    public Adresa() {}

    public Adresa(
        final String grad,
        final String ulica,
        final String broj,
        final int postanski_broj,
        final String drzava
    ) {
        this.grad = grad;
        this.ulica = ulica;
        this.broj = broj;
        this.postanski_broj = postanski_broj;
        this.drzava = drzava;
    }

    public String getUlica() {
        return ulica;
    }

    public void setUlica(String ulica) {
        this.ulica = ulica;
    }

    public String getBroj() {
        return broj;
    }

    public void setBroj(String broj) {
        this.broj = broj;
    }

    public int getPostanski_broj() {
        return postanski_broj;
    }

    public void setPostanski_broj(int postanski_broj) {
        this.postanski_broj = postanski_broj;
    }

    public String getGrad() {
        return grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }

    public String getDrzava() {
        return drzava;
    }

    public void setDrzava(String drzava) {
        this.drzava = drzava;
    }

}
