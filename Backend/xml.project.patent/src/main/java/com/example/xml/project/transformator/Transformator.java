package com.example.xml.project.transformator;

import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.model.resenje.Resenje;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.util.JAXBSource;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.example.xml.project.util.Constants.XSL_PUTANJA;
import static com.example.xml.project.util.Constants.XSL_RESENJE_PUTANJA;

@Component
public class Transformator {

    private static DocumentBuilderFactory documentFactory;

    private static TransformerFactory transformerFactory;

    private final JAXBContext jaxbContext;

    public Transformator() throws JAXBException {
        documentFactory = DocumentBuilderFactory.newInstance();
        documentFactory.setNamespaceAware(true);
        documentFactory.setIgnoringComments(true);
        documentFactory.setIgnoringElementContentWhitespace(true);
        this.jaxbContext = JAXBContext.newInstance(ZahtevPatent.class);
        transformerFactory = TransformerFactory.newInstance();
    }

    public byte[] generatePdf(final String htmlPutanja, final String pdfPutanja) throws IOException {
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfPutanja));
        pdfDocument.setDefaultPageSize(new PageSize(780, 2000));
        HtmlConverter.convertToPdf(Files.newInputStream(Paths.get(htmlPutanja)), pdfDocument);
        File fajl = new File(pdfPutanja);
        byte[] povratnaVrednost = FileUtils.readFileToByteArray(fajl);
        fajl.delete();
        fajl = new File(htmlPutanja);
        fajl.delete();

        return povratnaVrednost;
    }

    public byte[] generateHTML(
            final String htmlPutanja,
            final ZahtevPatent zahtev,
            final boolean jeGenerisanjePdf
    ) throws TransformationFailedException, IOException {
        File fajl;
        byte[] povratnaVrednost;
        try {
            StreamSource transformSource = new StreamSource(new File(XSL_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            //JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);
            JAXBContext jc = JAXBContext.newInstance(ZahtevPatent.class);
            JAXBSource source = new JAXBSource(jc, zahtev);
            System.out.println("Source" + source);
            FileOutputStream fo = new FileOutputStream(htmlPutanja);
            StreamResult result = new StreamResult(fo);
            transformer.transform(source, result);
            fo.close();

            fajl = new File(htmlPutanja);
            povratnaVrednost = FileUtils.readFileToByteArray(fajl);
            if (!jeGenerisanjePdf) {
                fajl.delete();
            }

        } catch (Exception e) {
            throw new TransformationFailedException("Creation of html failed. Try again late.");
        }

        return povratnaVrednost;
    }

    public byte[] generisiResenjeHTML(
            final String htmlPutanja,
            final Resenje zahtev,
            final boolean jeGenerisanjePdf
    ) throws TransformationFailedException, IOException {
        File fajl;
        byte[] povratnaVrednost;
        try {
            StreamSource transformSource = new StreamSource(new File(XSL_RESENJE_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            JAXBContext jc = JAXBContext.newInstance(Resenje.class);
            JAXBSource source = new JAXBSource(jc, zahtev);
            System.out.println("Source" + source);
            FileOutputStream fo = new FileOutputStream(htmlPutanja);
            StreamResult result = new StreamResult(fo);
            transformer.transform(source, result);
            fo.close();

            fajl = new File(htmlPutanja);
            povratnaVrednost = FileUtils.readFileToByteArray(fajl);
            if (!jeGenerisanjePdf) {
                fajl.delete();
            }

        } catch (Exception e) {
            throw new TransformationFailedException("Creation of html failed. Try again late.");
        }

        return povratnaVrednost;
    }
}
