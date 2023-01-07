package com.example.xml.project.service.interfaces;

import com.example.xml.project.dto.ZahtevAutorskaDelaDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviAutorskaDelaDTO;
import com.example.xml.project.exception.*;
import com.example.xml.project.model.A1.Autor;
import com.example.xml.project.model.A1.AutorskoDelo;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Prilozi;
import com.example.xml.project.model.Punomocnik;
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
public interface IAutorskaPravaService {
    UspesnaTransformacija dodajHtml(final String id, final boolean jeGenerisanjePdf)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException;
    UspesnaTransformacija dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, CannotUnmarshalException, TransformationFailedException;
    void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException;
    ZahtevAutorskaDela saveToDB(String zahtev) throws InvalidDocumentException;
    String saveNewRequest(
            String id,
            final String broj_prijave,
            final LocalDate datum_podnosenja,
            final boolean pregledano,
            final Institucija institucija,
            final Podnosilac podnosilac,
            final Punomocnik punomocnik,
            final AutorskoDelo autorsko_delo,
            final List<Autor> autori,
            final Prilozi prilozi
    )
            throws JAXBException, IOException, InvalidDocumentException, TransformationFailedException;
    void saveToDBObj(ZahtevAutorskaDela zahtevAutorskaDela, boolean generisiId) throws InvalidDocumentException;
    ZahtevAutorskaDela get(String documentId) throws EntityNotFoundException, JAXBException;
    ZahteviAutorskaDelaDTO uzmiZahteve(boolean obradjene) throws CannotUnmarshalException, XPathException;
    ZahtevAutorskaDela uzmiZahtevBezDTO(final String id) throws CannotUnmarshalException, XPathException;
    ZahtevAutorskaDelaDetaljneInformacijeDTO uzmiZahtev(final String id) throws CannotUnmarshalException, XPathException;
    ZahteviAutorskaDelaDTO pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parametriPretrage) throws Exception;
    UspesnaTransformacija generisiJson(String id) throws IOException;
    UspesnaTransformacija generisiRdf(String id) throws IOException;
    ZahteviAutorskaDelaDTO pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametriPretrage) throws Exception;


}
