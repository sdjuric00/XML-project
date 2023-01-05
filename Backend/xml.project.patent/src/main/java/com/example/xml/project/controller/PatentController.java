package com.example.xml.project.controller;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.dto.ZahtevPatentDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviPatentiDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.request.OpsegDatumaRequest;
import com.example.xml.project.request.NaprednaPretragaRequest;
import com.example.xml.project.request.ZahtevPatentRequest;
import com.example.xml.project.request.PretragaRequest;
import com.example.xml.project.response.UspesnaTransformacija;
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
import java.time.LocalDate;

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

    @PostMapping(produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveNewRequest(@Valid @RequestBody ZahtevPatentRequest zahtev)
            throws InvalidDocumentException, JAXBException, IOException {

        patentService.saveNewRequest(
                zahtev.getId(),
                zahtev.getBroj_prijave(),
                zahtev.getDatum_prijema(),
                zahtev.getPriznati_datum_podnosenja(),
                zahtev.isDopunska_prijava(),
                zahtev.isPregledano(),
                zahtev.getInstitucija(),
                zahtev.getPodaci_o_pronalasku(),
                zahtev.getPodnosilac(),
                zahtev.getPronalazac(),
                zahtev.getPunomocnik(),
                zahtev.getDostavljanje(),
                zahtev.getZahtev_za_priznanje_prava_iz_ranijih_prijava()
        );
    }

    @PostMapping(path="/izvestaj", consumes = "application/xml", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public IzvestajDTO generisiIzvestaj(@Valid @RequestBody final OpsegDatumaRequest opsegDatumaRequest) throws EntityNotFoundException, JAXBException, CannotUnmarshalException, XPathException {

        return patentService.generisiIzvestaj(
                LocalDate.parse(opsegDatumaRequest.getPocetni_datum()),
                LocalDate.parse(opsegDatumaRequest.getKrajnji_datum())
        );
    }

    @GetMapping(path="/neobradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviPatentiDTO uzmiNeobradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return patentService.uzmiZahteve(false);
    }

    @GetMapping(path="/obradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviPatentiDTO uzmiObradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return patentService.uzmiZahteve(true);
    }

    @GetMapping(path="/zahtev/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevPatentDetaljneInformacijeDTO uzmiZahtevPoId(
        @PathVariable @Valid  @NotBlank(message = "Id zahteva je neophodan.") final String id
    ) throws CannotUnmarshalException, XPathException {

        return patentService.uzmiZahtev(id);
    }

    @PostMapping(path="/osnovna-pretraga")
    public ZahteviPatentiDTO osnovnaPretraga(@RequestBody PretragaRequest pretragaRequest) throws Exception {

        return patentService.pronadjiRezultateOsnovnePretrage(pretragaRequest.getParametriPretrage());
    }

    @GetMapping(path = "/kreiraj-html/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createHTML(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {

        return patentService.dodajHtml(id);
    }

    @GetMapping(path = "/kreiraj-pdf/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createPDF(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, IOException, CannotUnmarshalException, TransformationFailedException
    {

        return patentService.dodajPdf(id);
    }

    @PostMapping(path="/dokumenti-referenciraju/{documentId}")
    public ZahteviPatentiDTO getDokumentiKojiReferenciraju(@PathVariable String documentId) throws Exception {
        return patentService.pronadjiDokumenteKojiReferenciraju(documentId);
    }
    @GetMapping(path = "/kreiraj-json/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createJSON(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id) throws IOException {

        return patentService.generisiJson(id);
    }

    @GetMapping(path = "/kreiraj-rdf/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createRDF(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id) throws IOException {

        return patentService.generisiRdf(id);
    }

    @PostMapping(path="/napredna-pretraga")
    public ZahteviPatentiDTO naprednaPretraga(@RequestBody NaprednaPretragaRequest pretragaRequest) throws Exception {
        return patentService.pronadjiRezultateNaprednePretrage(pretragaRequest.getParametriPretrage());
    }
}
