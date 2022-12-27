package com.example.xml.project.config.jwt;

import com.auth0.jwt.JWT;
import com.example.xml.project.dto.KorisnikDTO;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.model.Korisnici.KorisnikPrinciple;
import com.example.xml.project.service.KorisnikService;
import com.example.xml.project.util.JwtProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.example.xml.project.util.JwtProperties.SECRET;
import static com.example.xml.project.util.JwtProperties.TOKEN_PREFIX;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter{

    private final KorisnikService korisnikService;

    public JwtAuthorizationFilter(
        AuthenticationManager authenticationManager,
        KorisnikService korisnikService
    ) {
        super(authenticationManager);
        this.korisnikService = korisnikService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);

        if (headerIsInvalid(header)) {
            chain.doFilter(request, response);
        }
        else {
            Authentication authentication = getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        }
    }

    private Authentication getAuthentication(HttpServletRequest request) {
        Authentication authentication = null;
        try {
            authentication = getUsernamePasswordAuthentication(request);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return authentication;
    }

    private boolean headerIsInvalid(String header){

        return header == null || !header.startsWith(TOKEN_PREFIX);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request)
        throws EntityNotFoundException {
        String token = request.getHeader(JwtProperties.HEADER_STRING)
                .replace(TOKEN_PREFIX,"");

        String email = JWT.require(HMAC512(SECRET.getBytes()))
                .build()
                .verify(token)
                .getSubject();

        return emailIsNotNull(email) ? getSpringAuthToken(email) : null;
    }

    private UsernamePasswordAuthenticationToken getSpringAuthToken(String email)
        throws EntityNotFoundException
    {
        KorisnikDTO korisnikDTO = new KorisnikDTO(korisnikService.getKorisnikByEmail(email));
        return getUsernamePasswordAuthenticationToken(korisnikDTO);
    }

    private UsernamePasswordAuthenticationToken getUsernamePasswordAuthenticationToken(KorisnikDTO korisnikDTO) {
        KorisnikPrinciple principal = new KorisnikPrinciple(korisnikDTO);

        return new UsernamePasswordAuthenticationToken(
            korisnikDTO.getKontakt().getEmail(),
            principal.getPassword(),
            principal.getAuthorities()
        );
    }

    private boolean emailIsNotNull(String email){
        return email != null;
    }
}
