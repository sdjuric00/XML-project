package com.example.xml.project.transformator;

import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.model.Z1.resenje.Resenje;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;import javax.xml.bind.util.JAXBSource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.example.xml.project.util.Constants.*;

@Component
public class Transformator {

    private static DocumentBuilderFactory documentFactory;

    private static TransformerFactory transformerFactory;

    private final javax.xml.bind.JAXBContext jaxbContext;

    public static final int H = 120;
    public static final int W = 120;

    public Transformator() throws JAXBException {
        documentFactory = DocumentBuilderFactory.newInstance();
        documentFactory.setNamespaceAware(true);
        documentFactory.setIgnoringComments(true);
        documentFactory.setIgnoringElementContentWhitespace(true);
        this.jaxbContext = javax.xml.bind.JAXBContext.newInstance(ZahtevZig.class);
        transformerFactory = TransformerFactory.newInstance();
    }

    public void createQrCode(final String qrUrl, final String id, final boolean jeResenje) throws WriterException, IOException {
        String putanja = jeResenje ? TARGET_QR_CODE_RESENJE_PATH : TARGET_QR_CODE_FILE_PATH;
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrUrl, BarcodeFormat.QR_CODE, W, H);
        FileOutputStream outputStream = new FileOutputStream(putanja + id + ".png");
        MatrixToImageWriter.writeToStream(bitMatrix,"png", outputStream);
    }

    public byte[] generatePdf(final String htmlPutanja, final String pdfPutanja) throws IOException {
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfPutanja));
        pdfDocument.setDefaultPageSize(new PageSize(780, 2000));
        HtmlConverter.convertToPdf(Files.newInputStream(Paths.get(htmlPutanja)), pdfDocument);
        File fajl = new File(pdfPutanja);

        return FileUtils.readFileToByteArray(fajl);
    }

    public byte[] generateHTML(
            final String htmlPutanja,
            final ZahtevZig zahtev,
            final String qrUrl
    )
            throws TransformationFailedException, IOException {
        File fajl;
        try {
            createQrCode(qrUrl, zahtev.getId(), false);
            StreamSource transformSource = new StreamSource(new File(XSL_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            //JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);
            JAXBContext jc = JAXBContext.newInstance(ZahtevZig.class);
            JAXBSource source = new JAXBSource(jc, zahtev);
            System.out.println("Source" + source);
            StreamResult result = new StreamResult(new FileOutputStream(htmlPutanja));

            transformer.transform(source, result);

            fajl = new File(htmlPutanja);

        } catch (Exception e) {
            throw new TransformationFailedException("Creation of html failed. Try again late.");
        }

        return FileUtils.readFileToByteArray(fajl);
    }

    public byte[] generisiResenjeHTML(final String htmlPutanja, final Resenje zahtev, String qrUrl)
            throws TransformationFailedException, IOException {
        File fajl;
        try {
            createQrCode(qrUrl, zahtev.getId(), true);
            StreamSource transformSource = new StreamSource(new File(XSL_RESENJE_PUTANJA));
            Transformer transformer = transformerFactory.newTransformer(transformSource);

            JAXBContext jc = JAXBContext.newInstance(Resenje.class);
            JAXBSource source = new JAXBSource(jc, zahtev);
            System.out.println("Source" + source);
            StreamResult result = new StreamResult(new FileOutputStream(htmlPutanja));

            transformer.transform(source, result);

            fajl = new File(htmlPutanja);

        } catch (Exception e) {
            throw new TransformationFailedException("Creation of html failed. Try again late.");
        }

        return FileUtils.readFileToByteArray(fajl);
    }
}
