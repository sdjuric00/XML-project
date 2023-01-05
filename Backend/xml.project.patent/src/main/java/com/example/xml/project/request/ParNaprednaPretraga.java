package com.example.xml.project.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="par", propOrder={"naziv_elementa", "vrednost", "operator"})
public class ParNaprednaPretraga {

    @XmlElement(name="naziv_elementa", required = true)
    private String naziv_elementa;
    @XmlElement(name="vrednost", required=true)
    private String vrednost;
    @XmlElement(name="operator", required=true)
    private String operator;

    public String getNaziv_elementa() {
        return naziv_elementa;
    }

    public void setNaziv_elementa(String naziv_elementa) {
        this.naziv_elementa = naziv_elementa;
    }

    public String getVrednost() {
        return vrednost;
    }

    public void setVrednost(String vrednost) {
        this.vrednost = vrednost;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
