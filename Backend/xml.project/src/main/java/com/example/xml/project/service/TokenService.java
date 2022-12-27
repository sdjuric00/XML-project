package com.example.xml.project.service;

import com.auth0.jwt.JWT;
import com.example.xml.project.dto.JwtPrijava;
import com.example.xml.project.dto.KorisnikDTO;
import com.example.xml.project.dto.PrijavaDTO;
import com.example.xml.project.model.Korisnici.KorisnikPrinciple;
import com.example.xml.project.util.JwtProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Component
public class TokenService {
    private final AuthenticationManager authenticationManager;

    public TokenService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    private String generateToken(final KorisnikPrinciple principal) {

        return JWT.create()
                .withSubject(principal.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .sign(HMAC512(JwtProperties.SECRET.getBytes()));
    }

    public PrijavaDTO prijava(final JwtPrijava jwtPrijava) {
        Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(jwtPrijava.getEmail(), jwtPrijava.getLozinka())
        );
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        final String token = generateToken((KorisnikPrinciple) authenticate.getPrincipal());
        KorisnikPrinciple korisnikPrinciple = (KorisnikPrinciple) authenticate.getPrincipal();
        KorisnikDTO korisnikDTO = korisnikPrinciple.getKorisnikDTO();
        korisnikDTO.setTip_naloga(korisnikPrinciple.getKorisnikDTO().getTip_naloga());

        return new PrijavaDTO(token, korisnikDTO);
    }
}
