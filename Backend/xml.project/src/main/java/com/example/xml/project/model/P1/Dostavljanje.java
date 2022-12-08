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
    public boolean elektronski;
    @XmlAttribute(name="pismeno", required = true)
    public boolean pismeno;
    @XmlElement(name="adresa", required = true, namespace = "http://www.patent/patent")
    public Adresa adresa;
}
