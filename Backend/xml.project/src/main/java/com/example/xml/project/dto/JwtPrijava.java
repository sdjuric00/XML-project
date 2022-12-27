package com.example.xml.project.dto;

public class JwtPrijava {
    private String email;
    private String lozinka;

    public JwtPrijava() {}

    public JwtPrijava(String email, String lozinka) {
        this.email = email;
        this.lozinka = lozinka;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }
}