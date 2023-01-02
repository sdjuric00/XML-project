package com.example.xml.project.controller;

import com.example.xml.project.dto.ZahtevZigDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviZigDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.request.PretragaRequest;
import com.example.xml.project.request.ZigRequest;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.service.ZigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.util.List;
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

    @PostMapping(produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveNewRequest(@Valid @RequestBody ZigRequest zahtev)
            throws InvalidDocumentException, JAXBException, TransformationFailedException {

        zigService.saveNewRequest(
                zahtev.getId(),
                zahtev.getBroj_prijave(),
                zahtev.getDatum_podnosenja(),
                zahtev.isPregledano(),
                zahtev.getZig(),
                zahtev.getInstitucija(),
                zahtev.getPodnosioci(),
                zahtev.getPunomocnik(),
                zahtev.getPodaci_o_zajednickom_predstavniku(),
                zahtev.getZnak(),
                zahtev.getNicanska_klasifikacija(),
                zahtev.getPravo_prvenstva(),
                zahtev.getPlacene_takse(),
                zahtev.getPrilozi()
        );
    }

    @GetMapping(path="{documentId}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevZig get(@PathVariable @Valid @NotBlank(message = "Document id is required")
                                  final String documentId
    ) throws EntityNotFoundException, JAXBException {

        return zigService.get(documentId);
    }

    @GetMapping(path="/neobradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviZigDTO uzmiNeobradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return zigService.uzmiZahteve(false);
    }

    @GetMapping(path="/obradjeni-zahtevi", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahteviZigDTO uzmiObradjeneZahteve() throws CannotUnmarshalException, XPathException {

        return zigService.uzmiZahteve(true);
    }

    @GetMapping(path="/zahtev/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.OK)
    public ZahtevZigDetaljneInformacijeDTO uzmiZahtevPoId(
        @PathVariable @Valid  @NotBlank(message = "Id zahteva je neophodan.") final String id
    ) throws CannotUnmarshalException, XPathException {

        return zigService.uzmiZahtev(id);
    }

    @PostMapping(path="/osnovna-pretraga")
    public ZahteviZigDTO osnovnaPretraga(@RequestBody PretragaRequest pretragaRequest) throws Exception {
        return zigService.pronadjiRezultateOsnovnePretrage(pretragaRequest.getParametriPretrage());
    }

    @GetMapping(path = "/kreiraj-html/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createHTML(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {

        return zigService.dodajHtml(id);
    }

    @GetMapping(path = "/kreiraj-pdf/{id}", produces = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public UspesnaTransformacija createPDF(@PathVariable @Valid @NotNull(message = "Id ne sme biti prazan.") final String id)
            throws JAXBException, EntityNotFoundException, IOException, CannotUnmarshalException, TransformationFailedException
    {

        return zigService.dodajPdf(id);
    }

}
