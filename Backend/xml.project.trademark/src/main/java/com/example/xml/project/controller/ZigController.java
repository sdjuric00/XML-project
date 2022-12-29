package com.example.xml.project.controller;

import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.service.ZigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.xml.project.response.UspesanOdgovor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/zig")
public class ZigController {

    private final ZigService zigService;

    public ZigController(@Autowired final ZigService zigService) {
        this.zigService = zigService;
    }

    @PostMapping(path="/file")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToXmlFile(@RequestBody final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        System.out.println(zahtev);
        zigService.saveToXmlFile(zahtev);
    }

    @PostMapping(path = "/db")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveToDb(@RequestBody final String zahtev) throws InvalidDocumentException {
        System.out.println(zahtev);
        zigService.saveToDB(zahtev);
    }

    @GetMapping(path="{documentId}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevZig get(@PathVariable @Valid @NotBlank(message = "Document id is required")
                                  final String documentId
    ) throws EntityNotFoundException, JAXBException {

        return zigService.get(documentId);
    }

    @GetMapping(path = "/create-trademark-html/{id}", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesanOdgovor createHTML(@PathVariable @Valid @NotNull(message = "Poruka ne sme biti prazna.") final String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException
    {

        return zigService.dodajZigHtml(id);
    }

    @GetMapping(path = "/create-trademark-pdf/{id}", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesanOdgovor createPDF(@PathVariable @Valid @NotNull(message = "Poruka ne sme biti prazna.") final String id)
            throws JAXBException, EntityNotFoundException, IOException, TransformationFailedException
    {

        return zigService.dodajPdf(id);
    }

}
