package com.example.xml.project.controller;

import com.example.xml.project.service.AutorskaPravaService;
import com.example.xml.project.service.PatentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("/autorska-prava")
public class AutorskaPravaController {

    private final AutorskaPravaService autorskaPravaService;

    public AutorskaPravaController(@Autowired final AutorskaPravaService autorskaPravaService) {
        this.autorskaPravaService = autorskaPravaService;
    }

    @PostMapping
    public void createPatentDoc(@RequestBody final String zahtev) throws JAXBException, FileNotFoundException {
        System.out.println(zahtev);
        autorskaPravaService.save(zahtev);
    }
}
