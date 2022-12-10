package com.example.xml.project.controller;

import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.service.PatentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("/patent")
public class PatentController {

    @Autowired
    private PatentService patentService;
    @PostMapping
    public void createPatentDoc(@RequestBody String zahtev) throws JAXBException, FileNotFoundException {
        patentService.savePatentDoc(zahtev);
    }

}
