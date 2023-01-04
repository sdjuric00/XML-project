package com.example.xml.project.dto;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;

public class KreiranoResenjeSaZahtevomDTO {

    private String resenjeId;

    private ZahtevAutorskaDela zahtevAutorskaDela;

    public KreiranoResenjeSaZahtevomDTO() {

    }

    public KreiranoResenjeSaZahtevomDTO(
            final String resenjeId,
            final ZahtevAutorskaDela zahtevAutorskaDela
    ) {
        this.resenjeId = resenjeId;
        this.zahtevAutorskaDela = zahtevAutorskaDela;
    }

    public String getResenjeId() {
        return resenjeId;
    }

    public void setResenjeId(String resenjeId) {
        this.resenjeId = resenjeId;
    }

    public ZahtevAutorskaDela getZahtevAutorskaDela() {
        return zahtevAutorskaDela;
    }

    public void setZahtevAutorskaDela(ZahtevAutorskaDela zahtevAutorskaDela) {
        this.zahtevAutorskaDela = zahtevAutorskaDela;
    }
}
