package com.example.xml.project.service.implementation;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

import static com.example.xml.project.util.Constants.NASLOV_EMAIL_PORUKE;

@Service
public class EmailService {


    private final Environment env;

    public EmailService(
        final Environment env
    ) {
        this.env = env;
    }

    @Async
    public void posaljiResenjeOOdbijanjuKorisniku(ZahtevAutorskaDela zahtevAutorskaDela, String pdfPutanja) throws MailException {
        String datum = zahtevAutorskaDela.getDatum_podnosenja().format(DateTimeFormatter.ofPattern("dd.MM.yyyy."));
        String html = "<!doctype html>\n" +
            "<html ⚡4email data-css-strict>\n" +
            "\n" +
            "<head><meta charset=\"utf-8\"></head>" +
            "<body>" +
            "Postovani/a,<br/> Obavestavamo Vas da je zahtev za unosenje u evidenciju i deponovanje autorskih dela (" + zahtevAutorskaDela.getBroj_prijave() + " ) koji je podnet dana " + datum +
            "<b style='color: red;'> je ODBIJEN</b>. <br/>Razlog odbijanja, kao i dodatne informacije o izdatom resenju, mozete pogledati u prilozenom dokumentu. <br/>" +
            "S postovanjem, <br/><br/>" +
            zahtevAutorskaDela.getInstitucija().getNaziv() + "." +
            "</body>\n" +
            "\n" +
            "</html>";

        ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Mail.xml");
        HTMLEmailService mm = (HTMLEmailService) context.getBean("htmlMail");

        mm.sendMail("serbUberNWTKTS@gmail.com", "serbUberNWTKTS@gmail.com",
            String.format("%s%s", NASLOV_EMAIL_PORUKE, zahtevAutorskaDela.getBroj_prijave()),
            html,
            pdfPutanja
        );
    }

    @Async
    public void posaljiResenjeOPrihvatanjuKorisniku(ZahtevAutorskaDela zahtevAutorskaDela, String pdfPutanja) throws MailException {

        String datum = zahtevAutorskaDela.getDatum_podnosenja().format(DateTimeFormatter.ofPattern("dd.MM.yyyy."));
        String html = "<!doctype html>\n" +
            "<html ⚡4email data-css-strict>\n" +
            "\n" +
            "<head><meta charset=\"utf-8\"></head>" +
            "<body>" +
            "Postovani/a,<br/> Obavestavamo Vas da je zahtev za unosenje u evidenciju i deponovanje autorskih dela (" + zahtevAutorskaDela.getBroj_prijave() + " ) koji je podnet dana " + datum +
            "<b style='color: red;'> je ODOBREN</b>. <br/>Dodatne informacije o izdatom resenju, mozete pogledati u prilozenom dokumentu. <br/>" +
            "S postovanjem, <br/><br/>" +
            zahtevAutorskaDela.getInstitucija().getNaziv() + "." +
            "</body>\n" +
            "\n" +
            "</html>";

        ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Mail.xml");
        HTMLEmailService mm = (HTMLEmailService) context.getBean("htmlMail");

        mm.sendMail("serbUberNWTKTS@gmail.com", "serbUberNWTKTS@gmail.com",
            String.format("%s%s", NASLOV_EMAIL_PORUKE, zahtevAutorskaDela.getBroj_prijave()),
            html,
            pdfPutanja
        );
    }
}
