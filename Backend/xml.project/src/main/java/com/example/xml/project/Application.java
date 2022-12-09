package com.example.xml.project;

import com.example.xml.project.model.A1.ZahteviAutorskaDela;
import com.example.xml.project.model.Korisnici.Korisnici;

import com.example.xml.project.model.Z1.ZahteviZig;
import com.example.xml.project.model.P1.ZahteviPatenti;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.io.File;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {

//		SpringApplication.run(Application.class, args);
		try{

			JAXBContext jc = JAXBContext.newInstance(ZahteviPatenti.class);
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			File xml = new File("./data/P-1.xml");
			ZahteviPatenti zahteviPatenti = (ZahteviPatenti) unmarshaller.unmarshal(xml);

			jc = JAXBContext.newInstance(Korisnici.class);
			unmarshaller = jc.createUnmarshaller();
			xml = new File("./data/Korisnici.xml");
			Korisnici korisnici = (Korisnici) unmarshaller.unmarshal(xml);


			jc = JAXBContext.newInstance(ZahteviAutorskaDela.class);
			unmarshaller = jc.createUnmarshaller();
			xml = new File("./data/A-1.xml");
			ZahteviAutorskaDela zahteviAutoskaDela = (ZahteviAutorskaDela) unmarshaller.unmarshal(xml);

			jc = JAXBContext.newInstance(ZahteviZig.class);
			unmarshaller = jc.createUnmarshaller();
			xml = new File("./data/Z-1.xml");
			ZahteviZig zahteviZig = (ZahteviZig) unmarshaller.unmarshal(xml);


			System.out.println("USPESNO");
		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}

}
