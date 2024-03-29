package com.example.xml.project.transformator;

import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.request.izvestaji.IzvestajRequest;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.commons.io.FileUtils;
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
        this.jaxbContext = JAXBContext.newInstance(IzvestajRequest.class);
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
            final IzvestajRequest izvestaj,
            final boolean jeGenerisanjePdf
    ) throws TransformationFailedException, IOException {
        File fajl;
        byte[] povratnaVrednost;
        try {
            StreamSource transformSource = new StreamSource(new File(XSL_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            //JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);
            JAXBContext jc = JAXBContext.newInstance(IzvestajRequest.class);
            JAXBSource source = new JAXBSource(jc, izvestaj);
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
