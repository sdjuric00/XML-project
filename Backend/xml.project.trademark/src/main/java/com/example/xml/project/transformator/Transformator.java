package com.example.xml.project.transformator;

import com.example.xml.project.model.Z1.ZahtevZig;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;import javax.xml.bind.util.JAXBSource;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.example.xml.project.util.Constants.XSL_PUTANJA;

@Component
public class Transformator {

    private static DocumentBuilderFactory documentFactory;

    private static TransformerFactory transformerFactory;

    private final javax.xml.bind.JAXBContext jaxbContext;

    public Transformator() throws JAXBException {
        documentFactory = DocumentBuilderFactory.newInstance();
        documentFactory.setNamespaceAware(true);
        documentFactory.setIgnoringComments(true);
        documentFactory.setIgnoringElementContentWhitespace(true);
        this.jaxbContext = javax.xml.bind.JAXBContext.newInstance(ZahtevZig.class);
        transformerFactory = TransformerFactory.newInstance();
    }

    public void generatePDF(String html, String pdf) throws IOException {
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdf));
        pdfDocument.setDefaultPageSize(new PageSize(780, 2000));
        HtmlConverter.convertToPdf(Files.newInputStream(Paths.get(html)), pdfDocument);
    }

    public boolean generateHTML(final String htmlPutanja, final ZahtevZig zahtev) {
        try {
            StreamSource transformSource = new StreamSource(new File(XSL_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            //JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);
            JAXBContext jc = JAXBContext.newInstance(ZahtevZig.class);
            JAXBSource source = new JAXBSource(jc, zahtev);
            System.out.println("Source" + source);
            StreamResult result = new StreamResult(new FileOutputStream(htmlPutanja));

            transformer.transform(source, result);
            generatePDF("src/main/resources/static/html/1.html", "src/main/resources/static/pdf/1.pdf");

        } catch (TransformerConfigurationException e) {
            e.printStackTrace();

            return false;
        } catch (Exception e) {

            throw new RuntimeException(e);
        }

        return true;
    }
}