package com.example.xml.project.model.P1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="nazivi",
        namespace = "http://www.patent/patent"
)
public class Naziv {

    @XmlAttribute(name="jezik", required = true)
    public String jezik;
    @XmlValue
    public String naziv;
}
