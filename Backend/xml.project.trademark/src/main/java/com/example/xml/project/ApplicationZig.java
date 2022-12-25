package com.example.xml.project;

import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.repository.BasicXMLRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

@SpringBootApplication
public class ApplicationZig {

	public static void main(String[] args) {
		try{
			BasicXMLRepository.registerDatabase();
			SpringApplication.run(ApplicationZig.class, args);

//			Z-1 Unmarsaller and marshaller
			System.out.println("\n\n\n==========================================================");
			System.out.println("============= Z-1 Unmarsaller and marshaller =============");
			System.out.println("==========================================================\n\n\n");
			JAXBContext jc = JAXBContext.newInstance(ZahtevZig.class);
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			File xml = new File("./data/Z-1.xml");
			Marshaller marshaller = jc.createMarshaller();
			ZahtevZig zahteviZig = (ZahtevZig) unmarshaller.unmarshal(xml);
			marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(zahteviZig, System.out);

		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}
}
