package com.example.xml.project.request;


import com.example.xml.project.util.Constants;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

import static com.example.xml.project.exception.ErrorMessagesConstants.POGRESNA_LOZINKA;

@XmlRootElement(name = "prijava")
public class PrijavaRequest {

    @NotBlank(message = "Email must exist.")
    @Size(max = 1024, message = "Email length is too long.")
    @Email(message = "Email is in wrong format.")
    private String email;

    @NotBlank(message = POGRESNA_LOZINKA)
    @Pattern(regexp = Constants.ISPRAVNA_LOZINKA_REG,
        message = POGRESNA_LOZINKA)
    private String lozinka;

    public PrijavaRequest(final String email, final String lozinka) {
        this.email = email;
        this.lozinka = lozinka;
    }

    public PrijavaRequest(){}

    public String getEmail() {
        return email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }
}
