package com.example.xml.project.service.interfaces;

import com.example.xml.project.dto.ResenjeDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.Z1.resenje.Resenje;
import com.example.xml.project.response.UspesnaTransformacija;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface IResenjeService {
    void prihvatiZahtev(
            final String sifra_obradjenog_zahteva,
            final String ime_prezime_sluzbenika,
            final String referenca_na_zahtev,
            final boolean primerak_znaka_dat,
            final boolean spisak_robe_dat,
            final boolean punomocje_dato,
            final boolean generalno_punomocje_ranije_prilozeno,
            final boolean punomocje_ce_biti_naknadno_dostavljeno,
            final boolean opsti_akt,
            final boolean dokaz_o_pravu_prvenstva,
            final boolean dokaz_o_uplati_takse
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException;
    void odbijZahtev(
            final String razlog_odbijanja,
            final String ime_prezime_sluzbenika,
            final String referenca_na_zahtev,
            final boolean primerak_znaka_dat,
            final boolean spisak_robe_dat,
            final boolean punomocje_dato,
            final boolean generalno_punomocje_ranije_prilozeno,
            final boolean punomocje_ce_biti_naknadno_dostavljeno,
            final boolean opsti_akt,
            final boolean dokaz_o_pravu_prvenstva,
            final boolean dokaz_o_uplati_takse
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException;
    Resenje uzmiResenjeModel(String id) throws CannotUnmarshalException, XPathException;
    UspesnaTransformacija dodajResenjeHtml(String id)
            throws TransformationFailedException, IOException, CannotUnmarshalException, XPathException;
    UspesnaTransformacija procitajPdf(final String id)
            throws CannotUnmarshalException, TransformationFailedException, XPathException, IOException;
    String dodajResenjePdf(final String id)
            throws IOException, CannotUnmarshalException, TransformationFailedException, XPathException;
    ResenjeDTO uzmi(String id) throws CannotUnmarshalException, XPathException;
}
