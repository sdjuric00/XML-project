package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="autorsko_delo", propOrder={"vrsta_autorskog_dela", "forma_zapisa", "naslov", "alternativni_naslov", "podaci_o_naslovu_prerada"})
public class AutorskoDelo {

    @XmlAttribute(name="stvoreno_u_radnom_odnosu", required = true)
    public boolean stvoreno_u_radnom_odnosu;

    @XmlAttribute(name="nacin_koriscenja", required = true)
    public String nacin_koriscenja;

    @XmlElement(name="vrsta_autorskog_dela", required = true,  namespace = "http://ftn.ac.rs/a")
    public VrstaAutorskogDela vrsta_autorskog_dela;

    @XmlElement(name="forma_zapisa", required = true, namespace = "http://ftn.ac.rs/a")
    public FormaZapisa forma_zapisa;

    @XmlElement(name="naslov", required = true, namespace = "http://ftn.ac.rs/a")
    public String naslov;

    @XmlElement(name="alternativni_naslov", required = false, namespace = "http://ftn.ac.rs/a")
    public String alternativni_naslov;

    @XmlElement(name="podaci_o_naslovu_prerada", required = false, namespace = "http://ftn.ac.rs/a")
    public PodaciONaslovuPrerada podaci_o_naslovu_prerada;
}
