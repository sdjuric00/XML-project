package com.example.xml.project.controller;

import com.example.xml.project.dto.JwtPrijava;
import com.example.xml.project.dto.KorisnikDTO;
import com.example.xml.project.dto.PrijavaDTO;
import com.example.xml.project.exception.*;
import com.example.xml.project.model.Korisnici.Korisnik;
import com.example.xml.project.request.KorisnikRequest;
import com.example.xml.project.request.PrijavaRequest;
import com.example.xml.project.service.KorisnikService;
import com.example.xml.project.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("/korisnici")
public class KorisniciController {

    private final KorisnikService korisniciService;
    private final TokenService tokenService;

    public KorisniciController(
        @Autowired final KorisnikService korisniciService,
        @Autowired final TokenService tokenService
    ) {
        this.korisniciService = korisniciService;
        this.tokenService = tokenService;
    }

    @PostMapping(path="/prijava", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public PrijavaDTO prijaviSe(@Valid @RequestBody final PrijavaRequest prijavaZahtev) {

        return getPrijavaDTO(prijavaZahtev.getEmail(), prijavaZahtev.getLozinka());
    }

    @PreAuthorize("hasAnyRole('ROLE_SLUZBENIK')")
    @PostMapping(path="/registracija", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public KorisnikDTO registrujSe(@Valid @RequestBody KorisnikRequest korisnikRequest) throws PasswordsDoNotMatchException, EntityAlreadyExistsException, EntityNotFoundException {

        return korisniciService.registrujKorisnika(
            korisnikRequest.getKontakt().getEmail(),
            korisnikRequest.getKontakt().getFax(),
            korisnikRequest.getKontakt().getTelefon(),
            korisnikRequest.getAdresa().getGrad(),
            korisnikRequest.getAdresa().getUlica(),
            korisnikRequest.getAdresa().getBroj(),
            korisnikRequest.getAdresa().getPostanski_broj(),
            korisnikRequest.getAdresa().getDrzava(),
            korisnikRequest.getIme(),
            korisnikRequest.getPrezime(),
            korisnikRequest.getLozinka(),
            korisnikRequest.getPotvrdna_lozinka(),
            korisnikRequest.getTip_naloga()
        );
    }

    @PostMapping(path="/file")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToXmlFile(@RequestBody final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        System.out.println(zahtev);
        korisniciService.saveToXmlFile(zahtev);
    }

    @PostMapping(path = "/db")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToDb(@RequestBody final String zahtev) throws InvalidDocumentException {
        System.out.println(zahtev);
        korisniciService.saveToDB(zahtev);
    }

    @GetMapping(path="{documentId}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public Korisnik get(@PathVariable @Valid @NotBlank(message = "Document id is required")
                                         final String documentId
    ) throws EntityNotFoundException, JAXBException {

        return korisniciService.get(documentId);
    }

    private PrijavaDTO getPrijavaDTO(String email, String lozinka) {
        JwtPrijava jwtLogin = new JwtPrijava(email, lozinka);

        return tokenService.prijava(jwtLogin);
    }

}
