package com.example.xml.project;


import com.example.xml.project.model.P1.ZahtevPatent;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

@SpringBootApplication
public class ApplicationPatent {

	public static void main(String[] args) {
		try{
			SpringApplication.run(ApplicationPatent.class, args);

//			P-1 Unmarsaller and marshaller
			System.out.println("\n\n\n==========================================================");
			System.out.println("============= P-1 Unmarsaller and marshaller =============");
			System.out.println("==========================================================\n\n\n");
			JAXBContext jc = JAXBContext.newInstance(ZahtevPatent.class);
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			File xml = new File("./data/P-1.xml");
			Marshaller marshaller = jc.createMarshaller();
			ZahtevPatent zahtevPatent = (ZahtevPatent) unmarshaller.unmarshal(xml);
			marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(zahtevPatent, System.out);

		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}
}
