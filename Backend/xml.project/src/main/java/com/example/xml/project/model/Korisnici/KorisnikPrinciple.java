package com.example.xml.project.model.Korisnici;

import com.example.xml.project.dto.KorisnikDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class KorisnikPrinciple implements UserDetails {

    private final KorisnikDTO korisnikDTO;
    public KorisnikPrinciple(KorisnikDTO korisnikDTO) {
        this.korisnikDTO = korisnikDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(korisnikDTO.getTip_naloga().toString()));

        return authorities;
    }

    @Override
    public String getPassword() {
        return korisnikDTO.getLozinka();
    }

    @Override
    public String getUsername() {
        return korisnikDTO.getKontakt().getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public KorisnikDTO getKorisnikDTO() {
        return korisnikDTO;
    }
}
