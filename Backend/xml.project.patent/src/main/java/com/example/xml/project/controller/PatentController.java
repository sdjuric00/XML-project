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
import com.example.xml.project.service.implementation.PatentService;
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

import static com.example.xml.project.exception.ErrorMessagesConstants.MISSING_ID;
import static com.example.xml.project.exception.ErrorMessagesConstants.NEPOSTOJECI_ID;

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

    @GetMapping(path="/broj-prijave/{brojPrijave}/{idPrijave}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public String uzmiPoBrojuPrijave(
            @PathVariable @Valid @NotBlank(message = "Broj prijave je neophodan.") final String brojPrijave,
            @PathVariable @Valid @NotBlank(message = "Id prijave je neophodan.") final String idPrijave
    ) throws CannotUnmarshalException, XPathException {

        return patentService.uzmiIdPoBrojuPrijave(brojPrijave + "/" + idPrijave);
    }

    @PostMapping(produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public String saveNewRequest(@Valid @RequestBody ZahtevPatentRequest zahtev)
            throws InvalidDocumentException, JAXBException, IOException {

        return patentService.saveNewRequest(
                zahtev.getId(),
                zahtev.getBroj_prijave(),
                zahtev.getDatum_prijema(),
                zahtev.getPriznati_datum_podnosenja(),
                zahtev.isDopunska_prijava(),
                zahtev.isPregledano(),
                zahtev.getReferenca_na_podnosioca(),
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

        return patentService.uzmiZahteve(false, NEPOSTOJECI_ID);
    }

    @GetMapping(path="/neobradjeni-zahtevi-gradjanin/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviPatentiDTO uzmiNeobradjeneZahteveGradjanin(@Valid @NotNull(message = MISSING_ID) @PathVariable String id)
            throws CannotUnmarshalException, XPathException
    {

        return patentService.uzmiZahteve(false, id);
    }

    @GetMapping(path="/obradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviPatentiDTO uzmiObradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return patentService.uzmiZahteve(true, NEPOSTOJECI_ID);
    }

    @GetMapping(path="/obradjeni-zahtevi-gradjanin/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviPatentiDTO uzmiObradjeneZahteveGradjanin(@Valid @NotNull(message = MISSING_ID) @PathVariable String id)
            throws CannotUnmarshalException, XPathException
    {

        return patentService.uzmiZahteve(true, id);
    }

    @GetMapping(path="/zahtev/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevPatentDetaljneInformacijeDTO uzmiZahtevPoId(
        @PathVariable @Valid  @NotBlank(message = "Id zahteva je neophodan.") final String id
    ) throws CannotUnmarshalException, XPathException {

        return patentService.uzmiZahtev(id);
    }

    @PostMapping(path="/osnovna-pretraga/{idKorisnika}")
    public ZahteviPatentiDTO osnovnaPretraga(@RequestBody PretragaRequest pretragaRequest, @PathVariable String idKorisnika) throws Exception {

        return patentService.pronadjiRezultateOsnovnePretrage(pretragaRequest.getParametriPretrage(), idKorisnika);
    }

    @PostMapping(path="/osnovna-pretraga")
    public ZahteviPatentiDTO osnovnaPretraga(@RequestBody PretragaRequest pretragaRequest) throws Exception {

        return patentService.pronadjiRezultateOsnovnePretrage(pretragaRequest.getParametriPretrage(), "");
    }

    @GetMapping(path = "/kreiraj-html/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createHTML(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {

        return patentService.dodajHtml(id, false);
    }

    @GetMapping(path = "/kreiraj-pdf/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createPDF(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, IOException, CannotUnmarshalException, TransformationFailedException
    {

        return patentService.dodajPdf(id);
    }

    @GetMapping(path="/dokumenti-referenciraju/{documentId}", produces = "application/xml")
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
        return patentService.pronadjiRezultateNaprednePretrage(pretragaRequest.getParametriPretrage(), "");
    }

    @PostMapping(path="/napredna-pretraga/{idKorisnika}")
    public ZahteviPatentiDTO naprednaPretraga(@RequestBody NaprednaPretragaRequest pretragaRequest, @PathVariable String idKorisnika) throws Exception {
        return patentService.pronadjiRezultateNaprednePretrage(pretragaRequest.getParametriPretrage(), idKorisnika);
    }
}
