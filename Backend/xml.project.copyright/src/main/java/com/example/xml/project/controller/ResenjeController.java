package com.example.xml.project.controller;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.request.ResenjeOdbijanjeRequest;
import com.example.xml.project.request.ResenjePrihvatanjeRequest;
import com.example.xml.project.service.ResenjeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/autorska-prava/resenje")
public class ResenjeController {

    private final ResenjeService resenjeService;

    public ResenjeController(@Autowired final ResenjeService resenjeService) {
        this.resenjeService = resenjeService;
    }

    @PostMapping(path = "/prihvatanje", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public void prihvatiZahtev(@RequestBody final ResenjePrihvatanjeRequest resenjeRequest) throws InvalidDocumentException, CannotUnmarshalException, XPathException {

        resenjeService.prihvatiZahtev(
            resenjeRequest.getSifra_obradjenog_zahteva(),
            resenjeRequest.getIme_prezime_sluzbenika(),
            resenjeRequest.getReferenca_na_zahtev(),
            resenjeRequest.isOpis_checkbox(),
            resenjeRequest.isPrimer_checkbox()
        );
    }

    @PostMapping(path = "/odbijanje", produces = "application/xml", consumes = "application/xml")
    @ResponseStatus(HttpStatus.CREATED)
    public void odbijZahtev(@RequestBody final ResenjeOdbijanjeRequest resenjeRequest) throws InvalidDocumentException, CannotUnmarshalException, XPathException {

        resenjeService.odbijZahtev(
            resenjeRequest.getRazlog_odbijanja(),
            resenjeRequest.getIme_prezime_sluzbenika(),
            resenjeRequest.getReferenca_na_zahtev(),
            resenjeRequest.isOpis_checkbox(),
            resenjeRequest.isPrimer_checkbox()
        );
    }

//    @GetMapping(path="{documentId}", produces = "application/xml")
//    @ResponseStatus(HttpStatus.OK)
//    public ZahtevAutorskaDela get(@PathVariable @Valid @NotBlank(message = "Document id is required")
//                                  final String documentId
//    ) throws EntityNotFoundException, JAXBException {
//
//        return autorskaPravaService.get(documentId);
//    }
//
//    @GetMapping(path="/neobradjeni-zahtevi", produces = "application/xml")
//    @ResponseStatus(HttpStatus.OK)
//    public ZahteviAutorskaDelaDTO uzmiNeobradjeneZahteve() throws CannotUnmarshalException, XPathException {
//
//        return autorskaPravaService.uzmiZahteve(false);
//    }
//
//    @GetMapping(path="/obradjeni-zahtevi", produces = "application/xml")
//    @ResponseStatus(HttpStatus.OK)
//    public ZahteviAutorskaDelaDTO uzmiObradjeneZahteve() throws CannotUnmarshalException, XPathException {
//
//        return autorskaPravaService.uzmiZahteve(true);
//    }
//
//    @GetMapping(path="/zahtev/{id}", produces = "application/xml")
//    @ResponseStatus(HttpStatus.OK)
//    public ZahtevAutorskaDelaDetaljneInformacijeDTO uzmiZahtevPoId(
//        @PathVariable @Valid  @NotBlank(message = "Id zahteva je neophodan.") final String id
//    ) throws CannotUnmarshalException, XPathException {
//
//        return autorskaPravaService.uzmiZahtev(id);
//    }
//
//    @PostMapping(path="/osnovna-pretraga")
//    public List<ZahtevAutorskaDela> osnovnaPretraga(@RequestBody List<String> parametriPretrage) throws Exception {
//        System.out.println("fasjfajf");
//        return autorskaPravaService.pronadjiRezultateOsnovnePretrage(parametriPretrage);
//    }
}

