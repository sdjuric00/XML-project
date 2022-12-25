package com.example.xml.project.controller;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.service.AutorskaPravaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
@RestController
@RequestMapping("/autorska-prava")
public class AutorskaPravaController {

    private final AutorskaPravaService autorskaPravaService;

    public AutorskaPravaController(@Autowired final AutorskaPravaService autorskaPravaService) {
        this.autorskaPravaService = autorskaPravaService;
    }

    @PostMapping(path="/file")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToXmlFile(@RequestBody final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        System.out.println(zahtev);
        autorskaPravaService.saveToXmlFile(zahtev);
    }

    @PostMapping(path = "/db")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToDb(@RequestBody final String zahtev) throws InvalidDocumentException {
        System.out.println(zahtev);
        autorskaPravaService.saveToDB(zahtev);
    }

    @GetMapping(path="{documentId}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevAutorskaDela get(@PathVariable @Valid @NotBlank(message = "Document id is required")
                                         final String documentId
    ) throws EntityNotFoundException, CannotUnmarshalException, JAXBException {

        return autorskaPravaService.get(documentId);
    }
}
