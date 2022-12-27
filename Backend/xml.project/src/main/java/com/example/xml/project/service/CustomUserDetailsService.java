package com.example.xml.project.service;

import com.example.xml.project.dto.KorisnikDTO;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.model.Korisnici.KorisnikPrinciple;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import static com.example.xml.project.exception.ErrorMessagesConstants.NIJE_PRONADJEN_KORISNIK_EXCEPTION_MESSAGE;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final KorisnikService korisnikService;

    public CustomUserDetailsService(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @Override
    public UserDetails loadUserByUsername(final String email) {

        KorisnikDTO korisnikDTO = null;

        try {
            korisnikDTO = new KorisnikDTO(korisnikService.getKorisnikByEmail(email));
        } catch (EntityNotFoundException e) {
            System.out.println(NIJE_PRONADJEN_KORISNIK_EXCEPTION_MESSAGE);
            return null;
        }

        return new KorisnikPrinciple(korisnikDTO);

    }
}
