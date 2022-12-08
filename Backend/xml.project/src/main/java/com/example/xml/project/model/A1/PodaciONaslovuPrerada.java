package com.example.xml.project.model.A1;

import com.example.xml.project.model.A1.Autor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="podaci_o_naslovu_prerada", propOrder={"naslov", "autor"}, namespace = "http://ftn.ac.rs/a")
public class PodaciONaslovuPrerada {

    @XmlElement(name="naslov", required = true, namespace = "http://ftn.ac.rs/a")
    public String naslov;

    @XmlElement(name="autor", required = true, namespace = "http://ftn.ac.rs/a")
    public Autor autor;
}
