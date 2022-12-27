package com.example.xml.project.model.Korisnici;

import org.springframework.security.core.GrantedAuthority;

public class Uloga implements GrantedAuthority {

    private TipNaloga tipNaloga;

    public Uloga(){}

    public Uloga(TipNaloga tipNaloga) {
        this.tipNaloga = tipNaloga;
    }

    public TipNaloga getTipNaloga() {
        return tipNaloga;
    }


    @Override
    public String getAuthority() {
        return tipNaloga.toString();
    }
}
