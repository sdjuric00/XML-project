package com.example.xml.project;


import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.repository.BasicXMLRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

@SpringBootApplication
public class ApplicationCopyright {

	public static void main(String[] args) {
		try{
			BasicXMLRepository.registerDatabase();
			SpringApplication.run(ApplicationCopyright.class, args);

//			A-1 Unmarsaller and marshaller
			System.out.println("\n\n\n==========================================================");
			System.out.println("============= A-1 Unmarsaller and marshaller =============");
			System.out.println("==========================================================\n\n\n");
			JAXBContext jc = JAXBContext.newInstance(ZahtevAutorskaDela.class);
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			File xml = new File("./data/A-1.xml");
			ZahtevAutorskaDela zahtevAutorskaDela = (ZahtevAutorskaDela) unmarshaller.unmarshal(xml);
			Marshaller marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(zahtevAutorskaDela, System.out);

		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}
}
