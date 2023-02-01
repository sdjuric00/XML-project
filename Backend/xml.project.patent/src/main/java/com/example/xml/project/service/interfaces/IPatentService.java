package com.example.xml.project.service.interfaces;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.dto.ZahtevPatentDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviPatentiDTO;
import com.example.xml.project.exception.*;
import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.P1.*;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.request.ParNaprednaPretraga;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.response.UspesnaTransformacija;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public interface IPatentService  {
    void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException;
    ZahtevPatent saveToDB(String zahtev) throws InvalidDocumentException;
    void saveToDBObj(ZahtevPatent zahtevPatent, boolean generisiId) throws InvalidDocumentException;
    ZahtevPatent get(String documentId) throws EntityNotFoundException, JAXBException;
    IzvestajDTO generisiIzvestaj(final LocalDate pocetniDatum, final LocalDate krajnjiDatum) throws CannotUnmarshalException, XPathException;
    ZahteviPatentiDTO uzmiZahteve(final boolean obradjene, final String id) throws CannotUnmarshalException, XPathException;
    ZahtevPatentDetaljneInformacijeDTO uzmiZahtev(final String id) throws CannotUnmarshalException, XPathException;
    ZahteviPatentiDTO pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parametriPretrage, final String idKorisnika) throws Exception;
    ZahtevPatent uzmiZahtevBezDTO(final String id) throws CannotUnmarshalException, XPathException;
    ZahteviPatentiDTO pronadjiDokumenteKojiReferenciraju(final String documentId) throws Exception;
    UspesnaTransformacija dodajHtml(final String id, final boolean jeGenerisanjePdf) throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException;
    UspesnaTransformacija dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, CannotUnmarshalException, TransformationFailedException;
    String saveNewRequest(
            String id,
            final String broj_prijave,
            final LocalDate datum_prijema,
            final LocalDate priznati_datum_podnosenja,
            final boolean dopunska_prijava,
            final boolean pregledano,
            final String referenca_na_podnosioca,
            final Institucija institucija,
            final List<Naziv> podaci_o_pronalasku,
            final Podnosilac podnosilac,
            final PronalazacP pronalazac,
            final PunomocnikP punomocnik,
            final Dostavljanje dostavljanje,
            final List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava
    ) throws InvalidDocumentException, JAXBException, IOException;

    UspesnaTransformacija generisiJson(String id) throws IOException;

    UspesnaTransformacija generisiRdf(String id) throws IOException;
    ZahteviPatentiDTO pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametriPretrage, String idKorisnika) throws Exception;
    String uzmiIdPoBrojuPrijave(final String brojPrijave) throws CannotUnmarshalException, XPathException;


}
