package com.example.xml.project.service.interfaces;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.dto.PlaceneTakseDTO;
import com.example.xml.project.dto.ZahtevZigDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviZigDTO;
import com.example.xml.project.exception.*;
import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Punomocnik;
import com.example.xml.project.model.Z1.*;
import com.example.xml.project.model.Z1.enums.ZigEnum;
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
public interface IZigService {
    void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException;
    ZahtevZig saveToDB(String zahtev) throws InvalidDocumentException;
    void saveToDBObj(ZahtevZig zahtevZig, boolean generisiId) throws InvalidDocumentException;
    ZahtevZig get(String documentId) throws EntityNotFoundException, JAXBException;
    PlaceneTakseDTO dobaviOcekivanoPlacanje(String documentId) throws EntityNotFoundException, JAXBException;
    IzvestajDTO generisiIzvestaj(final LocalDate pocetniDatum, final LocalDate krajnjiDatum) throws CannotUnmarshalException, XPathException;
    ZahteviZigDTO uzmiZahteve(boolean obradjene) throws CannotUnmarshalException, XPathException;
    ZahtevZigDetaljneInformacijeDTO uzmiZahtev(String id) throws CannotUnmarshalException, XPathException;
    ZahtevZig uzmiZahtevBezDTO(final String id) throws CannotUnmarshalException, XPathException;
    UspesnaTransformacija dodajHtml(final String id, final boolean jeGenerisanjePdf)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException;
    ZahteviZigDTO pronadjiRezultateOsnovnePretrage(List<ParametarPretrage> parametriPretrage) throws Exception;
    ZahteviZigDTO pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametriPretrage) throws Exception;
    UspesnaTransformacija dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, TransformationFailedException;
    UspesnaTransformacija generisiJson(String id) throws IOException;
    UspesnaTransformacija generisiRdf(String id) throws IOException;
    String saveNewRequest(
            String id,
            final String broj_prijave,
            final LocalDate datum_podnosenja,
            final boolean pregledano,
            final ZigEnum zig,
            final Institucija institucija,
            final List<Podnosilac> podnosioci,
            final Punomocnik punomocnik,
            final PodaciOZajednickomPredstavniku podaci_o_zajednickom_predstavniku,
            final Znak znak, List<OdabraneKategorije> nicanska_klasifikacija,
            final PravoPrvenstva pravo_prvenstva,
            PlaceneTakse placene_takse,
            Prilozi prilozi
    ) throws JAXBException, InvalidDocumentException, TransformationFailedException, IOException;


}
