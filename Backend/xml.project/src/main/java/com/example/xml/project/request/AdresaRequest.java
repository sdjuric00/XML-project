package com.example.xml.project.request;


import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import static com.example.xml.project.exception.ErrorMessagesConstants.*;
import static com.example.xml.project.util.Constants.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"grad", "ulica", "broj", "postanski_broj", "drzava"})
public class AdresaRequest {

    @NotBlank(message = POGRESAN_GRAD)
    @Pattern(regexp = ISPRAVNO_IME_REG, message = POGRESAN_GRAD)
    @XmlElement(name="grad", required=true, namespace = "http://ftn.ac.rs/opste")
    private String grad;

    @NotBlank(message = POGRESNA_ULICA)
    @Pattern(regexp = ISPRAVNO_IME_REG, message = POGRESNA_ULICA)
    @XmlElement(name="ulica", required=true, namespace = "http://ftn.ac.rs/opste")
    private String ulica;

    @NotBlank(message = POGRESAN_BROJ)
    @Pattern(regexp = ISPRAVAN_BROJ_REG, message = POGRESAN_BROJ)
    @XmlElement(name="broj", required=true, namespace = "http://ftn.ac.rs/opste")
    private String broj;

    @Min(value=10000, message = POGRESAN_POSTANSKI_BROJ)
    @Max(value=99999, message = POGRESAN_POSTANSKI_BROJ)
    @XmlElement(name="postanski_broj", required=true, namespace = "http://ftn.ac.rs/opste")
    private int postanski_broj;

    @NotBlank(message = POGRESNA_DRZAVA)
    @Pattern(regexp = ISPRAVNO_IME_REG, message = POGRESNA_DRZAVA)
    @XmlElement(name="drzava", required=true, namespace = "http://ftn.ac.rs/opste")
    private String drzava;

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
