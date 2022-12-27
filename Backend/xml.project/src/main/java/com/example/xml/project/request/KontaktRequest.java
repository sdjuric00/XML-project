package com.example.xml.project.request;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import static com.example.xml.project.exception.ErrorMessagesConstants.*;
import static com.example.xml.project.util.Constants.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"email", "telefon", "fax"}, namespace = "http://ftn.ac.rs/opste")
public class KontaktRequest {

    @XmlElement(name="email", required=true, namespace = "http://ftn.ac.rs/opste")
    @Email(message = POGRESAN_EMAIL)
    @NotBlank(message = PRAZAN_EMAIL)
    @Size(max = 60, message = PREDUG_EMAIL)
    private String email;

    @NotBlank(message = POGRESAN_BROJ_TELEFONA)
    @Pattern(regexp = ISPRAVAN_BROJ_TELEFONA_REG, message = POGRESAN_BROJ_TELEFONA)
    @XmlElement(name="telefon", required=true, namespace = "http://ftn.ac.rs/opste")
    private String telefon;

    @NotBlank(message = POGRESAN_FAX)
    @Pattern(regexp = ISPRAVAN_FAX_REG, message = POGRESAN_FAX)
    @XmlElement(name="fax", required=true, namespace = "http://ftn.ac.rs/opste")
    private String fax;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }
}
