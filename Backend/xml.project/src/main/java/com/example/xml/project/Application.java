package com.example.xml.project;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.Korisnici.Korisnici;

import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.model.Z1.ZahteviZig;
import com.example.xml.project.model.P1.ZahteviPatenti;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.io.File;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		try{

<<<<<<< HEAD
//			JAXBContext jc = JAXBContext.newInstance(ZahteviPatenti.class);
=======
	SpringApplication.run(Application.class, args);
//		try{
//
//			JAXBContext jc = JAXBContext.newInstance(ZahtevPatent.class);
>>>>>>> 8356cc8865ef8f5f9c0bac981de7fe3acdbb3dad
//			Unmarshaller unmarshaller = jc.createUnmarshaller();
//			File xml = new File("./data/P-1.xml");
//			ZahtevPatent zahteviPatenti = (ZahtevPatent) unmarshaller.unmarshal(xml);
//
//			jc = JAXBContext.newInstance(Korisnici.class);
//			unmarshaller = jc.createUnmarshaller();
//			xml = new File("./data/Korisnici.xml");
//			Korisnici korisnici = (Korisnici) unmarshaller.unmarshal(xml);
<<<<<<< HEAD


//			JAXBContext jc = JAXBContext.newInstance(ZahtevAutorskaDela.class);
//			Unmarshaller unmarshaller = jc.createUnmarshaller();
//			File xml = new File("./data/A-1.xml");
//			ZahtevAutorskaDela zahteviAutoskaDela = (ZahtevAutorskaDela) unmarshaller.unmarshal(xml);

//			jc = JAXBContext.newInstance(ZahteviZig.class);
//			unmarshaller = jc.createUnmarshaller();
//			xml = new File("./data/Z-1.xml");
//			ZahteviZig zahteviZig = (ZahteviZig) unmarshaller.unmarshal(xml);


			System.out.println("USPESNO");
		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
=======
//
//
//			jc = JAXBContext.newInstance(ZahteviAutorskaDela.class);
//			unmarshaller = jc.createUnmarshaller();
//			xml = new File("./data/A-1.xml");
//			ZahteviAutorskaDela zahteviAutoskaDela = (ZahteviAutorskaDela) unmarshaller.unmarshal(xml);
//
//			jc = JAXBContext.newInstance(ZahtevZig.class);
//			unmarshaller = jc.createUnmarshaller();
//			xml = new File("./data/Z-1.xml");
//			ZahtevZig zahteviZig = (ZahtevZig) unmarshaller.unmarshal(xml);
//
//
//			System.out.println("USPESNO");
//		}catch (Exception ex){
//			System.out.println(ex.getMessage());
//		}
>>>>>>> 8356cc8865ef8f5f9c0bac981de7fe3acdbb3dad
	}

}
