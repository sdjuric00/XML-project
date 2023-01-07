<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0"
                xmlns:p="http://www.patent/patent"
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

                    .left {
                    display: flex;
                    justify-content: left;
                    text-align: center;
                    align-content: flex-start;
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
                </style>
                <title>Patent</title>
            </head>
            <body class="background-body">
                <div class="content">
                    <br />
                    <p style="text-align: right; margin: 1rem;">Obrazac P-1</p>
                    <br />
                    <div class="left" style="padding: 1.4rem; padding-bottom: 0.3rem;">
                        <table style="border: 1px solid black; border-collapse: collapse;">
                            <colgroup>
                                <col style="width: 15rem;"/>
                                <col style="width: 15rem;"/>
                            </colgroup>
                            <tr>
                                <th colspan="2" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <b>Popunjava zavod</b>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="2" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        Broj prijave
                                    </p>
                                    <p style="min-height: 1.5rem; margin: 0.4rem; text-align: center; font-weight: bold">
                                        <span><xsl:value-of select="//@broj_prijave" /></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        Datum prijema
                                    </p>
                                    <p style="min-height: 1.5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><xsl:value-of select="//@datum_prijema" /></span>
                                    </p>
                                </th>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        Priznati datum podnošenja
                                    </p>
                                    <p style="min-height: 1.5rem; margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><xsl:value-of select="//@priznati_datum_podnosenja" /></span>
                                    </p>
                                </th>
                            </tr>

                        </table>
                    </div>

                    <p style="padding-left: 1.4rem;">Republika Srbija</p>
                    <p style="padding-left: 1.4rem;">Zavod</p>
                    <p style="padding-left: 1.4rem;">Ulica</p>
                    <p style="padding-left: 1.4rem;">Republika Srbija</p>

                    <br />
                    <h2 class="center" style="font-size: 1.3rem;">ZAHTEV ZA<br/> PRIZNANJE PATENTA</h2>
                    <br />
                    <div class="center" style="padding: 1.4rem; padding-bottom: 0.3rem;">
                        <table style="border: 1px solid black; border-collapse: collapse;">
                            <colgroup>
                                <col style="width: 10rem;"/>
                                <col style="width: 10rem;"/>
                                <col style="width: 10rem;"/>
                                <col style="width: 10rem;"/>
                                <col style="width: 15rem;"/>
                            </colgroup>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>Polje broj I</b>&#x3000;<b>NAZIV PRONALASKA</b>
                                    </p>
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        *Naziv pronalaska treba da jasno i sažeto izražava suštinu pronalaska i ne sme
                                        da sadrži izmišljene ili komercijalne nazive, žigove, imena, šifre, uobicajene skracenice
                                        za proizvode i sl.
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span>Na srpskom jeziku: <xsl:value-of select="//p:podaci_o_pronalasku/p:naziv[@jezik = 'srpski']" /></span>
                                        <br />
                                        <span>Na engleskom jeziku: <xsl:value-of select="//p:podaci_o_pronalasku/p:naziv[@jezik = 'engleski']" /></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>Polje broj II</b>&#x3000;<b>PODNOSILAC PRIJAVE</b>
                                        <span style="margin-left: 3rem; font-weight: bold">
                                            <xsl:if test="//@autor = 'true'">
                                                <span>&#x3000;JESTE PRONALAZAC</span>
                                            </xsl:if>
                                            <xsl:if test="//@autor = 'false'">
                                                <span>&#x3000;NIJE PRONALAZAC</span>
                                            </xsl:if>
                                        </span>
                                    </p>
                                </th>
                            </tr>

                            <tr>

                                <th colspan="2" rowspan="3" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 5rem;">
                                        <span style="margin-left: 0.5rem;">Ime i prezime / Poslovno ime:</span>
                                        <br />
                                        <br />
                                        <span style="margin-left: 0.5rem;">
                                            <xsl:choose>
                                                <xsl:when test="//p:podnosilac/opste:fizicko_lice">
                                                    <span style="margin-left: 0.5rem;"><xsl:value-of select="//p:podnosilac//opste:ime"/>&#160;<xsl:value-of select="//p:podnosilac//opste:prezime"/></span>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <span style="margin-left: 0.5rem;"><xsl:value-of select="//p:podnosilac//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//p:podnosilac//opste:pib"/></span>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </span>
                                    </p>
                                </th>
                                <th colspan="2" rowspan="3" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 5rem;">
                                        <span style="margin-left: 0.5rem;">Ulica i broj, poštanski broj, mesto i <span style="margin-left: 0.5rem;">država:</span></span>
                                        <br />
                                        <br />
                                        <span style="margin-left: 0.5rem;">
                                            <xsl:value-of select="//p:podnosilac//opste:grad"/>&#160;<xsl:value-of select="//p:podnosilac//opste:ulica"/>&#160;<xsl:value-of select="//p:podnosilac//opste:broj"/>,&#160;<xsl:value-of select="//p:podnosilac//opste:postanski_broj"/>, &#160;<xsl:value-of select="//p:podnosilac//opste:drzava"/>
                                        </span>
                                    </p>
                                </th>
                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Broj telefona:<br />&#160;<xsl:value-of select="//p:podnosilac//opste:telefon" /></span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Broj faksa:<br />&#160;<xsl:value-of select="//p:podnosilac//opste:fax" /></span>
                                    </p>
                                </th>

                            </tr>

                            <tr>
                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 1.5rem;">
                                        <span style="margin-left: 0.5rem;">E-mail:<br />&#160;<xsl:value-of select="//p:podnosilac//opste:email" /></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>

                                <th colspan="5" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 1.5rem;">
                                        <span style="margin-left: 0.5rem;">Državljanstvo:&#160;
                                            <xsl:if test="//p:podnosilac/opste:fizicko_lice">
                                                <xsl:value-of select="//p:podnosilac//opste:drzava" />
                                            </xsl:if>
                                        </span>
                                        <span style="margin-left: 15rem;">(popuniti za fizicko lice)</span>
                                    </p>
                                </th>

                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><b>Ostali podnosioci prijave su navedeni u dodatnom listu 1 u nastavku ovog zahteva</b></span>
                                    </p>
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        * Ako više lica podnosi prijavu, potrebno je odrediti jedno od tih lica kao zajednickog predstavnika
                                        i dostaviti izjavu o zajednickom predstavniku potpisanu od strane svih podnosilaca ili imenovati zajednickog
                                        punomocnika za zastupanje i dostaviti punomocje
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><b>Polje broj III</b>&#x3000;<b>PRONALAZAC</b></span>
                                    </p>
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        (ako su svi pronalazaci ujedno i podnosioci prijave, polje broj III se ne popunjava)
                                    </p>
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        * Ako svi podnosioci prijave nisu i pronalazaci, dostavlja se izjava podnosilaca prijave
                                        i osnovnu sticanja prava na podnošenje prijave u odnosu na pronalazace koji nisu podnosioci
                                        prijave i u tom slucaju u polje broj III se unose podaci o svim pronalazacima
                                    </p>
                                </th>
                            </tr>

                            <tr>

                                <th colspan="2" rowspan="3" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 5rem;">
                                        <span style="margin-left: 0.5rem;">Ime i prezime:</span>
                                        <br />
                                        <br />
                                        <span style="margin-left: 0.5rem;">
                                            <span>
                                                <xsl:if test="//@autor = 'false'">
                                                    <xsl:choose>
                                                        <xsl:when test="//p:pronalazac/p:anonimni_pronalazac">
                                                            <span style="margin-left: 0.5rem;">Pronalazac je anoniman</span>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:choose>
                                                                <xsl:when test="//p:podnosilac/opste:fizicko_lice">
                                                                    <span style="margin-left: 0.5rem;"><xsl:value-of select="//p:podnosilac//opste:ime"/>&#160;<xsl:value-of select="//p:podnosilac//opste:prezime"/></span>
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <span style="margin-left: 0.5rem;"><xsl:value-of select="//p:podnosilac//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//p:podnosilac//opste:pib"/>,&#160;<xsl:value-of select="//p:podnosilac//opste:grad"/>&#160;<xsl:value-of select="//p:podnosilac//opste:ulica"/>&#160;<xsl:value-of select="//p:podnosilac//opste:broj"/>,&#160;<xsl:value-of select="//p:podnosilac//opste:postanski_broj"/>, &#160;<xsl:value-of select="//p:podnosilac//opste:drzava"/><br /></span>
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                </xsl:if>
                                            </span>
                                        </span>
                                    </p>
                                </th>
                                <th colspan="2" rowspan="3" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 5rem;">
                                        <span style="margin-left: 0.5rem;">Ulica i broj, poštanski broj, mesto i <span style="margin-left: 0.5rem;">država:</span></span>
                                        <br />
                                        <br />
                                        <span style="margin-left: 0.5rem;">
                                            <xsl:if test="//@autor = 'false'">
                                                <xsl:choose>
                                                    <xsl:when test="//p:pronalazac/p:anonimni_pronalazac">
                                                        <span>Pronalazac je anoniman</span>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <xsl:value-of select="//p:podnosilac//opste:grad"/>&#160;<xsl:value-of select="//p:podnosilac//opste:ulica"/>&#160;<xsl:value-of select="//p:podnosilac//opste:broj"/>,&#160;<xsl:value-of select="//p:podnosilac//opste:postanski_broj"/>, &#160;<xsl:value-of select="//p:podnosilac//opste:drzava"/>
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                            </xsl:if>
                                        </span>
                                    </p>
                                </th>
                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Broj telefona:<br />&#160;
                                            <xsl:if test="//@autor = 'false'">
                                                <xsl:value-of select="//p:podnosilac//opste:telefon" />
                                            </xsl:if>
                                        </span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Broj faksa:<br />&#160;
                                            <xsl:if test="//@autor = 'false'">
                                                <xsl:value-of select="//p:podnosilac//opste:fax" />
                                            </xsl:if>
                                        </span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">E-mail:<br />&#160;
                                            <xsl:if test="//@autor = 'false'">
                                                <xsl:value-of select="//p:podnosilac//opste:email" />
                                            </xsl:if>
                                        </span>
                                    </p>
                                </th>

                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: bold; min-height: 1.5rem;">
                                        <span style="margin-left: 0.5rem;">Ostali pronalazaci su navedeni u dodatnom listu 1 u nastavku ovog zahteva</span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <b>Polje broj IV</b>
                                        <span style="margin-left: 1rem;"><b>
                                            <xsl:if test="//@za_zastupanje = 'true'">
                                                <span>PUNOMOCNIK ZA ZASTUPANJE</span>
                                            </xsl:if>
                                            <xsl:if test="//@za_prijem_pismeno = 'true'">
                                                <span>PUNOMOCNIK ZA PRIJEM PISMENA</span>
                                            </xsl:if>
                                            </b>
                                        </span>
                                    </p>
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        * Punomocnik za zastupanje je lice koje je po ovlašcenju podnosioca prijave preduzima radnje
                                        u upravnom postupku u granicama punomocja
                                    </p>
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        * Punomocnik za prijem pismena je lice koje je podnosilac prijave odredio kao lice
                                        kome se upucuju sva pismena naslovljena na podnosioca
                                    </p>
                                </th>
                            </tr>

                            <tr>

                                <th colspan="2" rowspan="3" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 5rem;">
                                        <span style="margin-left: 0.5rem;">Ime i prezime:</span>
                                        <br />
                                        <br />
                                        <span style="margin-left: 0.5rem;">
                                            <xsl:choose>
                                                <xsl:when test="//p:punomocnik/p:fizicko_lice">
                                                    <span style="margin-left: 0.5rem;"><xsl:value-of select="//p:punomocnik//opste:ime"/>&#160;<xsl:value-of select="//p:punomocnik//opste:prezime"/></span>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <span style="margin-left: 0.5rem;"><xsl:value-of select="//p:punomocnik//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//p:punomocnik//opste:pib"/></span>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </span>
                                    </p>
                                </th>
                                <th colspan="2" rowspan="3" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal; min-height: 5rem;">
                                        <span style="margin-left: 0.5rem;">Ulica i broj, poštanski broj, mesto i <span style="margin-left: 0.5rem;">država:</span></span>
                                        <br />
                                        <br />
                                        <span style="margin-left: 0.5rem;">
                                            <xsl:value-of select="//p:punomocnik//opste:grad"/>&#160;<xsl:value-of select="//p:punomocnik//opste:ulica"/>&#160;<xsl:value-of select="//p:punomocnik//opste:broj"/>,&#160;<xsl:value-of select="//p:punomocnik//opste:postanski_broj"/>, &#160;<xsl:value-of select="//p:punomocnik//opste:drzava"/>
                                        </span>
                                    </p>
                                </th>
                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Broj telefona:<br />&#160;<xsl:value-of select="//p:punomocnik//opste:telefon" /></span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Broj faksa:<br />&#160;<xsl:value-of select="//p:punomocnik//opste:fax" /></span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="1" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">E-mail:<br />&#160;<xsl:value-of select="//p:punomocnik//opste:email" /></span>
                                    </p>
                                </th>

                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><b>Polje broj V</b>&#x3000;<b>ADRESA ZA DOSTAVLJANJE</b></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>

                                <th colspan="5" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">Ulica i broj, poštanski broj i mesto:
                                            <xsl:value-of select="//p:dostavljanje//opste:grad"/>&#160;<xsl:value-of select="//p:dostavljanje//opste:ulica"/>&#160;<xsl:value-of select="//p:dostavljanje//opste:broj"/>,&#160;<xsl:value-of select="//p:dostavljanje//opste:postanski_broj"/>, &#160;<xsl:value-of select="//p:dostavljanje//opste:drzava"/>
                                        </span>
                                    </p>
                                </th>

                            </tr>

                            <tr>
                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><b>Polje broj VI</b>&#x3000;<b>NACIN DOSTAVLJANJA</b></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>

                                <th colspan="5" style="border: 1px solid black;">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span style="margin-left: 0.5rem;">
                                            <xsl:if test="//@elektronski = 'true' and //@pismeno = 'true'">
                                                <span>ELEKTRONSKI, PISMENO</span>
                                            </xsl:if>
                                            <xsl:if test="//@elektronski = 'true' and //@pismeno = 'false'">
                                                <span>ELEKTRONSKI</span>
                                            </xsl:if>
                                            <xsl:if test="//@pismeno = 'true' and //@elektronski = 'false'">
                                                <span>PISMENO</span>
                                            </xsl:if>
                                        </span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><b>Polje broj VII</b></span>
                                    </p>
                                </th>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>DOPUNSKA</span>
                                    </p>
                                </th>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>
                                            <b>
                                                <xsl:if test="//@dopunska_prijava = 'true'"><span>X</span></xsl:if>
                                            </b>
                                        </span>
                                    </p>
                                </th>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>IZDVOJENA</span>
                                    </p>
                                </th>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>
                                            <b>
                                                <xsl:if test="//@dopunska_prijava = 'false'"><span>X</span></xsl:if>
                                            </b>
                                        </span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="5" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                        <span><b>Polje broj VIII</b>&#x3000;<b>ZAHTEV ZA PRIZNANJE PRAVA PRVENSTVA IZ RANIJIH PRIJAVA</b></span>
                                    </p>
                                </th>

                            </tr>

                            <tr>

                                <th colspan="2" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>Datum podnošenja ranije<br />prijave</span>
                                    </p>
                                </th>

                                <th colspan="1" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>Broj ranije prijave</span>
                                    </p>
                                </th>

                                <th colspan="2" style="border: 1px solid black">
                                    <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                        <span>Dvoslovna oznaka države,<br />regionalne ili medjunarodne<br />organizacije</span>
                                    </p>
                                </th>

                            </tr>

                            <xsl:if test="count(//p:zahtev_za_priznanje_prava_iz_ranijih_prijava//p:prijava) > 0">
                                <xsl:for-each select="//p:zahtev_za_priznanje_prava_iz_ranijih_prijava//p:prijava">
                                    <tr>
                                        <th colspan="1" width="10%" style="border: 1px solid black">
                                            <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                                <span><b><xsl:value-of select="position()" />.</b></span>
                                            </p>
                                        </th>

                                        <th colspan="1" width="30%" style="border: 1px solid black">
                                            <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                                <span><xsl:value-of select="p:datum_podnosenja_prijave" /></span>
                                            </p>
                                        </th>

                                        <th colspan="1" width="30%" style="border: 1px solid black">
                                            <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                                <span><xsl:value-of select="p:broj_ranije_prijave" /></span>
                                            </p>
                                        </th>

                                        <th colspan="2" width="30%" style="border: 1px solid black">
                                            <p style="margin: 0.4rem; text-align: center; font-weight: normal">
                                                <span><xsl:value-of select="p:dvoslovna_oznaka_drzave" /></span>
                                            </p>
                                        </th>
                                    </tr>
                                </xsl:for-each>

                            </xsl:if>
                            <xsl:if test="count(//p:zahtev_za_priznanje_prava_iz_ranijih_prijava//p:prijava) = 0">
                                <tr>
                                    <th colspan="5" style="border: 1px solid black">
                                        <p style="margin: 0.4rem; text-align: left; font-weight: normal">
                                            <span>Nema ranijih prijava</span>
                                        </p>
                                    </th>
                                </tr>
                            </xsl:if>

                        </table>
                    </div>

                </div>
            </body>

        </html>
    </xsl:template>
</xsl:stylesheet>