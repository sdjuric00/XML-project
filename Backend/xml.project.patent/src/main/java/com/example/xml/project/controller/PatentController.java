package com.example.xml.project.controller;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.response.UspesanOdgovor;
import com.example.xml.project.service.PatentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/patent")
public class PatentController {

    private final PatentService patentService;

    public PatentController(@Autowired final PatentService patentService) {
        this.patentService = patentService;
    }

    @PostMapping(path="/file")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToXmlFile(@RequestBody final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        System.out.println(zahtev);
        patentService.saveToXmlFile(zahtev);
    }

    @PostMapping(path = "/db")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToDb(@RequestBody final String zahtev) throws InvalidDocumentException {
        System.out.println(zahtev);
        patentService.saveToDB(zahtev);
    }

    @GetMapping(path="{documentId}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevPatent get(@PathVariable @Valid @NotBlank(message = "Document id is required")
                                  final String documentId
    ) throws EntityNotFoundException, CannotUnmarshalException, JAXBException {

        return patentService.get(documentId);
    }

    @GetMapping(path = "/create-patent-html/{id}", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesanOdgovor createHTML(@PathVariable @Valid @NotNull(message = "Poruka ne sme biti prazna.") final String id)
            throws JAXBException, EntityNotFoundException, CannotUnmarshalException, TransformationFailedException
    {

        return patentService.dodajHtml(id);
    }

    @GetMapping(path = "/create-patent-pdf/{id}", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesanOdgovor createPDF(@PathVariable @Valid @NotNull(message = "Poruka ne sme biti prazna.") final String id)
            throws JAXBException, EntityNotFoundException, IOException, CannotUnmarshalException, TransformationFailedException
    {

        return patentService.dodajPdf(id);
    }

}
