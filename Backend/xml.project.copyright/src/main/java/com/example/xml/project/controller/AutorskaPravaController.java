package com.example.xml.project.controller;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.dto.ZahtevAutorskaDelaDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviAutorskaDelaDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;

import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.request.OpsegDatumaRequest;
import com.example.xml.project.request.NaprednaPretragaRequest;
import com.example.xml.project.request.ZahtevAutorskaDelaRequest;
import com.example.xml.project.request.PretragaRequest;
import com.example.xml.project.service.implementation.AutorskaPravaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.xml.project.response.UspesnaTransformacija;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.io.IOException;

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

    @PostMapping(produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public String saveNewRequest(@Valid @RequestBody ZahtevAutorskaDelaRequest zahtev)
            throws InvalidDocumentException, JAXBException, IOException, TransformationFailedException
    {

        return autorskaPravaService.saveNewRequest(
                zahtev.getId(),
                zahtev.getBroj_prijave(),
                zahtev.getDatum_podnosenja(),
                zahtev.isPregledano(),
                zahtev.getInstitucija(),
                zahtev.getPodnosilac(),
                zahtev.getPunomocnik(),
                zahtev.getAutorsko_delo(),
                zahtev.getAutori(),
                zahtev.getPrilozi()
        );
    }

    @PostMapping(path="/izvestaj", consumes = "application/xml", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public IzvestajDTO generisiIzvestaj(@Valid @RequestBody final OpsegDatumaRequest opsegDatumaRequest) throws EntityNotFoundException, JAXBException, CannotUnmarshalException, XPathException {

        return autorskaPravaService.generisiIzvestaj(
            LocalDate.parse(opsegDatumaRequest.getPocetni_datum()),
            LocalDate.parse(opsegDatumaRequest.getKrajnji_datum())
        );
    }

    @GetMapping(path="{documentId}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevAutorskaDela get(@PathVariable @Valid @NotBlank(message = "Document id is required")
                                         final String documentId
    ) throws EntityNotFoundException, JAXBException {

        return autorskaPravaService.get(documentId);
    }

    @GetMapping(path="/neobradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviAutorskaDelaDTO uzmiNeobradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return autorskaPravaService.uzmiZahteve(false);
    }

    @GetMapping(path="/obradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviAutorskaDelaDTO uzmiObradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return autorskaPravaService.uzmiZahteve(true);
    }

    @GetMapping(path="/zahtev/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevAutorskaDelaDetaljneInformacijeDTO uzmiZahtevPoId(
        @PathVariable @Valid  @NotBlank(message = "Id zahteva je neophodan.") final String id
    ) throws CannotUnmarshalException, XPathException {

        return autorskaPravaService.uzmiZahtev(id);
    }

    @PostMapping(path="/osnovna-pretraga")
    public ZahteviAutorskaDelaDTO osnovnaPretraga(@RequestBody PretragaRequest pretragaRequest) throws Exception {
        System.out.println("fasjfajf");
        return autorskaPravaService.pronadjiRezultateOsnovnePretrage(pretragaRequest.getParametriPretrage());
    }

    @GetMapping(path = "/kreiraj-html/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createHTML(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {

        return autorskaPravaService.dodajHtml(id);
    }

    @GetMapping(path = "/kreiraj-pdf/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createPDF(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, IOException, CannotUnmarshalException, TransformationFailedException
    {

        return autorskaPravaService.dodajPdf(id);
    }

    @GetMapping(path = "/kreiraj-json/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createJSON(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id) throws IOException {

        return autorskaPravaService.generisiJson(id);
    }

    @GetMapping(path = "/kreiraj-rdf/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createRDF(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id) throws IOException {

        return autorskaPravaService.generisiRdf(id);
    }

    @PostMapping(path="/napredna-pretraga")
    public ZahteviAutorskaDelaDTO naprednaPretraga(@RequestBody NaprednaPretragaRequest pretragaRequest) throws Exception {
        return autorskaPravaService.pronadjiRezultateNaprednePretrage(pretragaRequest.getParametriPretrage());
    }
}
