package com.example.xml.project.controller;

import com.example.xml.project.dto.ZahtevPatentDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviPatentiDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.service.PatentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.util.List;

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
    public List<ZahtevPatent> osnovnaPretraga(@RequestBody List<String> parametriPretrage) throws Exception {

        return patentService.pronadjiRezultateOsnovnePretrage(parametriPretrage);
    }
}
