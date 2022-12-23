package com.example.xml.project.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"email", "telefon", "fax"}, namespace = "http://ftn.ac.rs/opste")
public class Kontakt {

    @XmlElement(name="email", required=true, namespace = "http://ftn.ac.rs/opste")
    private String email;

    @XmlElement(name="telefon", required=true, namespace = "http://ftn.ac.rs/opste")
    private String telefon;

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
