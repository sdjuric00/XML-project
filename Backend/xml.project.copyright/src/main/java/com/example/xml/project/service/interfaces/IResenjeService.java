package com.example.xml.project.service.interfaces;

import com.example.xml.project.dto.ResenjeDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.A1.resenje.Resenje;
import com.example.xml.project.response.UspesnaTransformacija;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface IResenjeService {

    void prihvatiZahtev(
            final String sifra_obradjenog_zahteva,
            final String ime_prezime_sluzbenika,
            final String referenca_na_zahtev,
            final boolean dat_opis_autorskog_dela,
            final boolean dat_primer_autorskog_dela
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException, TransformationFailedException, IOException;

    void odbijZahtev(
            final String razlog_odbijanja,
            final String ime_prezime_sluzbenika,
            final String referenca_na_zahtev,
            final boolean dat_opis_autorskog_dela,
            final boolean dat_primer_autorskog_dela
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException, TransformationFailedException, IOException;
    ResenjeDTO uzmi(String id) throws CannotUnmarshalException, XPathException;
    Resenje uzmiResenjeModel(String id) throws CannotUnmarshalException, XPathException;
    UspesnaTransformacija dodajResenjeHtml(final String id, final boolean jeGenerisanjePdf)
            throws TransformationFailedException, IOException, CannotUnmarshalException, XPathException;
    UspesnaTransformacija procitajPdf(final String id)
            throws CannotUnmarshalException, TransformationFailedException, XPathException, IOException;
    byte[] dodajResenjePdf(final String id)
            throws IOException, CannotUnmarshalException, TransformationFailedException, XPathException;

}
