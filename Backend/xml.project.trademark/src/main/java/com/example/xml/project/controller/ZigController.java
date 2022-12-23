package com.example.xml.project.controller;

import com.example.xml.project.service.ZigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("/trademark")
public class ZigController {

    @Autowired
    private ZigService trademarkServiceService;

    @PostMapping
    public void createTrademarkDoc(@RequestBody String zahtev) throws JAXBException, FileNotFoundException {
        System.out.println(zahtev);
        trademarkServiceService.saveTrademarkDoc(zahtev);
    }

}
