package com.example.xml.project.transformator;

import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.util.JAXBSource;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.example.xml.project.util.Constants.XSL_PUTANJA;

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

    public boolean generatePdf(String htmlPutanja, String pdfPutanja) throws IOException {
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfPutanja));
        pdfDocument.setDefaultPageSize(new PageSize(780, 2000));
        HtmlConverter.convertToPdf(Files.newInputStream(Paths.get(htmlPutanja)), pdfDocument);

        return true;
    }

    public boolean generateHTML(final String htmlPutanja, final ZahtevPatent zahtev)
            throws TransformationFailedException
    {
        try {
            StreamSource transformSource = new StreamSource(new File(XSL_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            //JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);
            JAXBContext jc = JAXBContext.newInstance(ZahtevPatent.class);
            JAXBSource source = new JAXBSource(jc, zahtev);
            System.out.println("Source" + source);
            StreamResult result = new StreamResult(new FileOutputStream(htmlPutanja));

            transformer.transform(source, result);

        } catch (Exception e) {
            throw new TransformationFailedException("Creation of html failed. Try again late.");
        }

        return true;
    }
}
