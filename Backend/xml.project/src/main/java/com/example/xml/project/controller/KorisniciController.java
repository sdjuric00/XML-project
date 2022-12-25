package com.example.xml.project.controller;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.model.Korisnici.Korisnik;
import com.example.xml.project.service.KorisniciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("/korisnici")
public class KorisniciController {

    private final KorisniciService korisniciService;

    public KorisniciController(@Autowired final KorisniciService korisniciService) {
        this.korisniciService = korisniciService;
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
    ) throws EntityNotFoundException, CannotUnmarshalException, JAXBException {

        return korisniciService.get(documentId);
    }
}
