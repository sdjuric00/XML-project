package com.example.xml.project.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="prijava")
public class PrijavaDTO {

    private String token;
    private KorisnikDTO korisnik;

    public PrijavaDTO() {
    }

    public PrijavaDTO(final String token, final KorisnikDTO korisnikDTO) {
        this.token = token;
        this.korisnik = korisnikDTO;
    }

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public KorisnikDTO getKorisnikDTO() {
        return korisnik;
    }

    public void setKorisnikDTO(final KorisnikDTO korisnikDTO) {
        this.korisnik = korisnikDTO;
    }
}
