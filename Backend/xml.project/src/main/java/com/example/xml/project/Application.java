package com.example.xml.project;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;

import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.model.Z1.ZahtevZig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		try{
			SpringApplication.run(Application.class, args);

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

//			P-1 Unmarsaller and marshaller
			System.out.println("\n\n\n==========================================================");
			System.out.println("============= P-1 Unmarsaller and marshaller =============");
			System.out.println("==========================================================\n\n\n");
			jc = JAXBContext.newInstance(ZahtevPatent.class);
			unmarshaller = jc.createUnmarshaller();
			xml = new File("./data/P-1.xml");
			ZahtevPatent zahtevPatent = (ZahtevPatent) unmarshaller.unmarshal(xml);
			marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(zahtevPatent, System.out);

//			Z-1 Unmarsaller and marshaller
			System.out.println("\n\n\n==========================================================");
			System.out.println("============= Z-1 Unmarsaller and marshaller =============");
			System.out.println("==========================================================\n\n\n");
			jc = JAXBContext.newInstance(ZahtevZig.class);
			unmarshaller = jc.createUnmarshaller();
			xml = new File("./data/Z-1.xml");
			ZahtevZig zahteviZig = (ZahtevZig) unmarshaller.unmarshal(xml);
			marshaller = jc.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(zahteviZig, System.out);

		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}

}
