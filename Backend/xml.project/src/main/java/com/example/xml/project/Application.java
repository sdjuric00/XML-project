package com.example.xml.project;

import com.example.xml.project.repository.BasicXMLRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		try{
			BasicXMLRepository.registerDatabase();
			SpringApplication.run(Application.class, args);
		}catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}
}
