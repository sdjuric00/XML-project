<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0"
                xmlns:a="http://ftn.ac.rs/a"
                xmlns:opste="http://ftn.ac.rs/opste">
    <xsl:template match="/">
        <html>
            <head>
                <style> .background-body {
                    background: gray;
                    padding: 1.5rem;
                    padding-bottom: 0px;
                    display: flex;
                    align-items: center;
                    flex-flow: column;
                    font-family: Arial;
                    }

                    .content {
                    background: white;
                    min-width: 70%;
                    min-height: 70%;
                    }

                    .center {
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    align-content: center;
                    }

                    p {
                    margin:0;
                    padding: 0;
                    margin-block-start: 0;
                    margin-block-end: 0;
                    }

                    input[type="checkbox"] {
                        vertical-align:middle;
                    }

                    a {
                        text-decoration: none;
                    }

                </style>
                <title>Autorsko pravo (XSLT)</title>
            </head>
            <body class="background-body">
                <div class="content">
                    <br></br>
                    <div class="center" style="padding: 1.4rem;">
                        <table style="border: 1px solid black; border-collapse: collapse;">
                            <colgroup>
                                <col style="width: 15rem;"/>
                                <col style="width: 15rem;"/>
                                <col style="width: 15rem" />
                            </colgroup>
                            <tr>
                                <th colspan="3">
                                    <p style="text-align: left; margin: 0.4rem;">ZAVOD ZA INTELEKTUALNU SVOJINU</p>
                                    <p style="text-align: right; margin: -1.7rem 0.4rem 0.4rem 0.4rem;">OBRAZAC A-1</p>
                                    <p style="text-align: left; margin: 0.4rem; font-weight: normal;"><xsl:value-of select="//a:institucija//opste:grad"/>,&#160;<xsl:value-of select="//a:institucija//opste:ulica"/>&#160;<xsl:value-of select="//a:institucija//opste:broj"/></p>
                                    <h4 style="font-size: 1.2rem; margin: 1.2rem; margin-bottom: 1.6rem;">ZAHTEV ZA UNOŠENJE U EVIDENCIJU I<br /> DEPONOVANJE AUTORSKIH DELA</h4>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>1) Podnosilac-</b> ime, prezime, adresa i državljanstvo autora ili drugog nosioca
                                        autorskog prava ako je podnosilac fizicko lice, odnosno poslovno ime i sedište
                                        nosioca autorskog prava ako je podnosilac pravno lice*:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:choose>
                                            <xsl:when test="//a:podnosilac/opste:fizicko_lice">
                                                <span><xsl:value-of select="//a:podnosilac//opste:ime"/>&#160;<xsl:value-of select="//a:podnosilac//opste:prezime"/>,&#160;<xsl:value-of select="//a:podnosilac//opste:grad"/>&#160;<xsl:value-of select="//a:podnosilac//opste:ulica"/>&#160;<xsl:value-of select="//a:podnosilac//opste:broj"/>,&#160;<xsl:value-of select="//a:podnosilac//opste:postanski_broj"/>, &#160;<xsl:value-of select="//a:podnosilac//opste:drzava"/><br /></span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span><xsl:value-of select="//a:podnosilac//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//a:podnosilac//opste:pib"/>,&#160;<xsl:value-of select="//a:podnosilac//opste:grad"/>&#160;<xsl:value-of select="//a:podnosilac//opste:ulica"/>&#160;<xsl:value-of select="//a:podnosilac//opste:broj"/>,&#160;<xsl:value-of select="//a:podnosilac//opste:postanski_broj"/>, &#160;<xsl:value-of select="//a:podnosilac//opste:drzava"/><br /></span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="1" style="min-width: 15rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="margin: 0.2rem">
                                        <span style="font-size: 0.8rem;">telefon:&#160;<xsl:value-of select="//a:podnosilac//opste:telefon" /></span>
                                    </p>
                                </th>
                                <th colspan="1" style="min-width: 15rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="margin: 0.2rem">
                                        <span style="font-size: 0.8rem;">email:&#160;<xsl:value-of select="//a:podnosilac//opste:email" /></span>
                                    </p>
                                </th>
                                <th colspan="1" style="min-width: 15rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="margin: 0.2rem">
                                        <span style="font-size: 0.8rem;">faks:&#160;<xsl:value-of select="//a:podnosilac//opste:fax" /></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>2)</b> Pseudonim ili znak autora (ako ga ima):
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:for-each select="//a:autori//a:autor">
                                            <xsl:choose>
                                                <xsl:when test="a:imenovani_autor//a:pseudonim">
                                                    <span><xsl:value-of select="position()" />. <xsl:value-of select="a:imenovani_autor/a:ime"/>&#160;<xsl:value-of select="a:imenovani_autor/a:prezime"/>&#160;-&#160;<xsl:value-of select="a:imenovani_autor/a:pseudonim"/><br /></span>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <span><xsl:value-of select="position()" />. Autor je anoniman<br /></span>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </xsl:for-each>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>3)</b> Ime, prezime i adresa punomocnika, ako se prijava odnosi preko punomocnika:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:choose>
                                            <xsl:when test="//a:punomocnik">
                                                <xsl:choose>
                                                    <xsl:when test="//a:punomocnik/opste:fizicko_lice">
                                                        <span><xsl:value-of select="//a:punomocnik//opste:ime"/>&#160;<xsl:value-of select="//a:punomocnik//opste:prezime"/>,&#160;<xsl:value-of select="//a:punomocnik//opste:grad"/>&#160;<xsl:value-of select="//a:punomocnik//opste:ulica"/>&#160;<xsl:value-of select="//a:punomocnik//opste:broj"/>,&#160;<xsl:value-of select="//a:punomocnik//opste:postanski_broj"/>, &#160;<xsl:value-of select="//a:punomocnik//opste:drzava"/>&#xa;</span>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <span><xsl:value-of select="//a:punomocnik//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//a:punomocnik//opste:pib"/>,&#160;<xsl:value-of select="//a:punomocnik//opste:grad"/>&#160;<xsl:value-of select="//a:punomocnik//opste:ulica"/>&#160;<xsl:value-of select="//a:punomocnik//opste:broj"/>,&#160;<xsl:value-of select="//a:punomocnik//opste:postanski_broj"/>, &#160;<xsl:value-of select="//a:punomocnik//opste:drzava"/>&#xa;</span>
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                Prijava se ne odnosi preko punomocnika
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="4" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>4)</b> Naslov autorskog dela, odnosno alternativni naslov, ako ga ima,
                                        po kome autorsko delo može da se identifikuje*:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span>Naslov: <xsl:value-of select="//a:autorsko_delo/a:naslov" /><br /></span>
                                        <xsl:if test="//a:autorsko_delo/a:alternativni_naslov">
                                            <span>Alternativni naslov: <xsl:value-of select="//a:autorsko_delo/a:alternativni_naslov" /></span>
                                        </xsl:if>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>5)</b> Podaci o naslovu autorskog dela na kome se zasniva delo prerade,
                                        ako je u pitanju autorsko delo prerade, kao i podatak o autoru izvornog dela:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:choose>
                                            <xsl:when test="//a:podaci_o_naslovu_prerada">
                                                <span>Naslov: <xsl:value-of select="//a:podaci_o_naslovu_prerada/a:naslov" /><br /></span>
                                                <span>Autor: </span>
                                                    <xsl:choose>
                                                        <xsl:when test="//a:podaci_o_naslovu_prerada/a:autor/a:imenovani_autor">
                                                            <span><xsl:value-of select="//a:podaci_o_naslovu_prerada//a:ime"/>&#160;<xsl:value-of select="//a:podaci_o_naslovu_prerada//a:prezime"/>-&#160;<xsl:value-of select="//a:podaci_o_naslovu_prerada//a:pseudonim"/><br /></span>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <span>Anonimni autor<br /></span>
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                Autorsko delo nije prerada
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>6)</b> Podaci o vrsti dela(književno delo, muzicko delo, likovno delo
                                        , racunarski program i dr.)*:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:choose>
                                            <xsl:when test="//a:vrsta_autorskog_dela/a:vrsta_custom">
                                                <span><xsl:value-of select="//a:vrsta_autorskog_dela/a:vrsta_custom"/></span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span><xsl:value-of select="//a:vrsta_autorskog_dela/a:vrsta_enum"/></span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>7)</b> Podaci o formi zapisa autorskog dela(štampani tekst, opticki disk
                                        i slicno)*:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:choose>
                                            <xsl:when test="//a:forma_zapisa/a:vrsta_custom">
                                                <span><xsl:value-of select="//a:forma_zapisa/a:vrsta_custom"/></span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span><xsl:value-of select="//a:forma_zapisa/a:vrsta_enum"/></span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>8)</b> Podaci o autoru ako podnosilac prijave iz tacke 1. ovog zahteva nije autor
                                        i to: prezime, ime, adresa, državljanstvo autora(grupe autora ili koautora), a ako
                                        su u pitanju jedan ili više autora koji nisu živi, imena autora i godine smrti autora, a
                                        ako je u pitanju autorsko delo anonimnog autora navod da je autorsko delo delo anonimnog
                                        autora:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span>Autori:<br /></span>
                                        <xsl:for-each select="//a:autori//a:autor">
                                            <xsl:choose>
                                                <xsl:when test="a:imenovani_autor">
                                                    <xsl:choose>
                                                        <xsl:when test="a:imenovani_autor/a:godina_smrti">
                                                            <span><xsl:value-of select="position()" />. <xsl:value-of select="a:imenovani_autor/a:ime"/>&#160;<xsl:value-of select="a:imenovani_autor/a:prezime"/>,&#160;godina smrti:<xsl:value-of select="a:imenovani_autor//a:godina_smrti"/><br /></span>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <span><xsl:value-of select="position()" />. <xsl:value-of select="a:imenovani_autor/a:ime"/>&#160;<xsl:value-of select="a:imenovani_autor/a:prezime"/>,&#160;<xsl:value-of select="a:imenovani_autor//opste:ulica"/>&#160;<xsl:value-of select="a:imenovani_autor//opste:broj"/>&#160;<xsl:value-of select="a:imenovani_autor//opste:grad"/>&#160;<xsl:value-of select="a:imenovani_autor//a:drzavljanstvo"/>&#160;državljanstvo<br /></span>
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <span><xsl:value-of select="position()" />. Anonimni autor<br /></span>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </xsl:for-each>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>9)</b> Podatak da li je u pitanju autorsko delo stvoreno u radnom odnosu:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <xsl:if test="//@stvoreno_u_radnom_odnosu = 'true'">
                                            <span>Delo je stvoreno u radnom odnosu</span>
                                        </xsl:if>
                                        <xsl:if test="//@stvoreno_u_radnom_odnosu = 'false'">
                                            <span>Delo nije stvoreno u radnom odnosu</span>
                                        </xsl:if>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>10)</b> Nacin korišcenja autorskog dela ili nameravan nacin korišcenja autorskog dela:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span>Nacin korišcenja:<xsl:value-of select="//@nacin_koriscenja" /></span>
                                    </p>
                                </th>
                            </tr>

                        </table>
                    </div>

                    <div class="center" style="padding: 1.4rem;">
                        <table style="border: 1px solid black; border-collapse: collapse;">
                            <colgroup>
                                <col style="width: 22.5rem;"/>
                                <col style="width: 22.5rem;"/>
                            </colgroup>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>12)</b> Prilozi koji se podnose uz zahtev:
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="min-height: 5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span>Opis:&#160;<xsl:value-of select="//a:opis" /><br /></span>
                                        <span>Primerak:&#160;
                                            <a target="_blank">
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="concat('http://localhost:8081/images/', //a:primerak)" />
                                                </xsl:attribute>
                                                <xsl:value-of select="//a:primerak" />
                                            </a>
                                        </span>
                                        <br />
                                        <span>
                                            <img style="height: 6rem; width: auto;">
                                                <xsl:attribute name="src">
                                                    <xsl:value-of select="concat('http://localhost:8081/images/', //a:primerak)"/>
                                                </xsl:attribute>
                                            </img>
                                        </span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: bold">
                                        <h4 style="font-size: 1.1rem; margin:0;">POPUNJAVA ZAVOD:</h4>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left;"><b>Prilozi uz prijavu:</b></p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center;"><b></b></p>
                                </th>
                                <th colspan="2" style="border: 1px solid black">
                                    <p style="text-align: left; margin: 0.4rem; font-weight: normal">
                                        <span>
                                            opis autorskog dela (ako je delo podneto na optickom disku)
                                        </span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center;"><b>X</b></p>
                                </th>
                                <th colspan="2" style="border: 1px solid black">
                                    <p style="text-align: left; margin: 0.4rem; font-weight: normal">
                                        <span>
                                            primer autorskog dela (slika, video zapis, audio zapis)
                                        </span>
                                    </p>
                                </th>
                            </tr>

                        </table>
                    </div>

                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>