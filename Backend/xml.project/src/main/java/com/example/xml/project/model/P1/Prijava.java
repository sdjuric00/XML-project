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
    public LocalDate datum_podnosenja_prijave;
    @XmlElement(name="broj_ranije_prijave", required = true, namespace = "http://www.patent/patent")
    public String broj_ranije_prijave;
    @XmlElement(name="dvoslovna_oznaka_drzave", required = true, namespace = "http://www.patent/patent")
    public String dvoslovna_oznaka_drzave;
}
