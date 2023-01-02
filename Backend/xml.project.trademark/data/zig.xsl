<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0"
                xmlns:z="http://www.zig/zig"
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
                </style>
                <title>Zig (XSLT)</title>
            </head>
            <body class="background-body">
                <div class="content">
                    <br></br>
                    <p style="margin-bottom: 0; margin-top: 3rem; text-align: center;">
                        <span style="font-weight: bold; font-size: 1.2rem;">ZAHTEV ZA PRIZNANJE ZIGA</span>
                    </p>
                    <p style="margin-bottom: 0.8rem;margin-top: 0; text-align: center;">
                        <span style="font-weight: bold; font-size: 0.9rem;"><xsl:value-of select="//z:institucija/opste:naziv"/>, <xsl:value-of select="//z:institucija//opste:ulica"/>&#160;<xsl:value-of select="//z:institucija//opste:broj"/>, <xsl:value-of select="//z:institucija//opste:postanski_broj"/>&#160;<xsl:value-of select="//z:institucija//opste:grad"/></span>
                    </p>

                    <div class="center" style="padding: 1.4rem;">
                        <table style="border: 1px solid black; border-collapse: collapse;">
                            <colgroup>
                                <col style="width: 8rem;"/>
                                <col style="width: 8rem;"/>
                                <col style="width: 8rem;"/>
                                <col style="width: 8rem;"/>
                                <col style="width: 8rem;"/>
                                <col style="width: 8rem;"/>
                            </colgroup>
                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="padding: 0.3rem 0 0.3rem 0.3rem;">
                                        <span style="min-height: 0.9rem; font-size: 1rem;"><b>1. Podnosilac prijave:</b> ime
                                            i prezime/poslovno ime, ulica i broj, poštanski broj, mesto<br/> i država prebivališta/sedišta:</span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-height: 4rem; min-width: 48rem; text-align: left; font-weight: normal;">
                                    <p style="min-height: 0.5rem; font-weight: bold; font-size: 0.8rem; padding: 0; margin: 0;">
                                        <xsl:for-each select="//z:podnosioci//z:podnosilac">
                                            <xsl:choose>
                                                <xsl:when test="opste:fizicko_lice">
                                                    <p style=" padding: 0; margin: 0; margin-bottom: 0.2rem;"><xsl:value-of select="opste:fizicko_lice/opste:ime"/>&#160;<xsl:value-of select="opste:fizicko_lice/opste:prezime"/>,&#160;<xsl:value-of select="opste:fizicko_lice/opste:adresa/opste:grad"/>&#160;<xsl:value-of select="opste:fizicko_lice/opste:adresa/opste:ulica"/>&#160;<xsl:value-of select="opste:fizicko_lice/opste:adresa/opste:broj"/>,&#160;<xsl:value-of select="opste:fizicko_lice/opste:adresa/opste:postanski_broj"/>, &#160;<xsl:value-of select="opste:fizicko_lice/opste:adresa/opste:drzava"/>&#xa;</p>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <p style=" padding: 0; margin: 0; margin-bottom: 0.2rem;"><xsl:value-of select="opste:pravno_lice/opste:naziv"/>,&#160;PIB:<xsl:value-of select="opste:pravno_lice/opste:pib"/>,&#160;<xsl:value-of select="opste:pravno_lice/opste:adresa/opste:grad"/>&#160;<xsl:value-of select="opste:pravno_lice/opste:adresa/opste:ulica"/>&#160;<xsl:value-of select="opste:pravno_lice/opste:adresa/opste:broj"/>,&#160;<xsl:value-of select="opste:pravno_lice/opste:adresa/opste:postanski_broj"/>, &#160;<xsl:value-of select="opste:pravno_lice/opste:adresa/opste:drzava"/>&#xa;</p>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </xsl:for-each>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">telefon:&#160;<xsl:value-of select="//z:podnosioci/z:podnosilac[position() = 1]//opste:telefon"/></span>
                                    </p>
                                </th>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">email:&#160;<xsl:value-of select="//z:podnosioci/z:podnosilac[position() = 1]//opste:email"/></span>
                                    </p>
                                </th>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">faks:&#160;<xsl:value-of select="//z:podnosioci/z:podnosilac[position() = 1]//opste:fax"/></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="padding: 0.3rem 0 0.3rem 0.3rem;">
                                        <span style="min-height: 0.8rem; font-size: 1rem;"><b>2. Punomocnik:</b> ime
                                            i prezime/poslovno ime, ulica i broj, postanski broj, mesto<br/> i drzava prebivališta/sedista:</span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal;">
                                    <p style="min-height: 0.9rem">
                                        <span style="font-weight: bold; font-size: 0.8rem;">
                                            <xsl:choose>
                                                <xsl:when test="//z:punomocnik/opste:fizicko_lice">
                                                    <p style=" padding: 0; margin: 0 0 0.3rem;"><xsl:value-of select="//z:punomocnik//opste:ime"/>&#160;<xsl:value-of select="//z:punomocnik//opste:prezime"/>,&#160;<xsl:value-of select="//z:punomocnik//opste:grad"/>&#160;<xsl:value-of select="//z:punomocnik//opste:ulica"/>&#160;<xsl:value-of select="//z:punomocnik//opste:broj"/>,&#160;<xsl:value-of select="//z:punomocnik//opste:postanski_broj"/>, &#160;<xsl:value-of select="//z:punomocnik//opste:drzava"/>&#xa;</p>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <p style=" padding: 0; margin: 0 0 0.3rem;"><xsl:value-of select="//z:punomocnik//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//z:punomocnik//opste:pib"/>,&#160;<xsl:value-of select="//z:punomocnik//opste:grad"/>&#160;<xsl:value-of select="//z:punomocnik//opste:ulica"/>&#160;<xsl:value-of select="//z:punomocnik//opste:broj"/>,&#160;<xsl:value-of select="//z:punomocnik//opste:postanski_broj"/>, &#160;<xsl:value-of select="//z:punomocnik//opste:drzava"/>&#xa;</p>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">telefon:&#160;<xsl:value-of select="//z:punomocnik//opste:telefon"/></span>
                                    </p>
                                </th>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">email:&#160;<xsl:value-of select="//z:punomocnik//opste:email"/></span>
                                    </p>
                                </th>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">faks:&#160;<xsl:value-of select="//z:punomocnik//opste:fax"/></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="padding: 0.3rem 0 0.3rem 0.3rem;">
                                        <span style="min-height: 0.8rem; font-size: 1rem;"><b>3. Podaci o zajednickom predstavniku ako postoji više podnosilaca prijave:</b></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal;">
                                    <p style="min-height: 0.9rem">
                                        <span style="font-weight: bold; font-size: 0.8rem;">
                                            <xsl:choose>
                                                <xsl:when test="//z:podaci_o_zajednickom_predstavniku/z:fizicko_lice">
                                                    <p style=" padding: 0; margin: 0 0 0.3rem;"><xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:ime"/>&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:prezime"/>,&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:grad"/>&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:ulica"/>&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:broj"/>,&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:postanski_broj"/>, &#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:drzava"/>&#xa;</p>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <p style=" padding: 0; margin: 0 0 0.3rem;"><xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:naziv"/>,&#160;PIB:<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:pib"/>,&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:grad"/>&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:ulica"/>&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:broj"/>,&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:postanski_broj"/>, &#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:drzava"/>&#xa;</p>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">telefon:&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:telefon"/></span>
                                    </p>
                                </th>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">email:&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:email"/></span>
                                    </p>
                                </th>
                                <th colspan="2" style="min-width: 16rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p>
                                        <span style="font-size: 0.8rem;">faks:&#160;<xsl:value-of select="//z:podaci_o_zajednickom_predstavniku//opste:fax"/></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style=" text-align: left; font-weight: normal; font-size: 1rem; border: 1px solid black; min-height: 0.8rem;">
                                    <b><span style="padding: 0.3rem 0 0.3rem 0.3rem;">4. Prijava se odnosi za (upisati X):</span></b>
                                </th>

                                <th colspan="3" rowspan="15" style="text-align: left; vertical-align:top; font-weight: normal; font-size: 0.8rem; border: 1px solid black;">
                                    <b>v) izgled znaka</b>
                                    <br></br>
                                    <span style="text-align: center; align-items:center;">
                                        <img style="height: 14rem; width: auto;">
                                            <xsl:attribute name="src">
                                                <xsl:value-of select="concat('http://localhost:8083/images/', //@primerak_znaka_putanja)"/>
                                            </xsl:attribute>
                                        </img>
                                    </span>
                                </th>
                            </tr>

                            <tr>
                                <th rowspan="4" width="10%" style=" border: 1px solid black;">
                                    <span>a)</span>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; border-right: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    individualni žig
                                </th>
                                <th style="padding: 0; border-right: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;" >
                                    <xsl:if test="//@zig = 'individualni'">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>

                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    kolektivni žig
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//@zig = 'kolektivni'">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    žig garancije
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//@zig = 'garancije'">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th rowspan="6" style="border: 1px solid black; font-weight: bold; height: 1.2rem;">
                                    <span>b)</span>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    verbalni znak
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//z:vrsta_znaka/z:vrsta_enum[text() = 'verbalni']">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    graficki znak, boju,<br/>kombinaciju boja
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//z:vrsta_znaka/z:vrsta_enum[text() = 'graficki']">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    kombinovani znak
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//z:vrsta_znaka/z:vrsta_enum[text() = 'kombinovani']">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    trodimenzionalni znak
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//z:vrsta_znaka/z:vrsta_enum[text() = 'trodimenzionalni']">
                                        <span style="font-weight: normal; padding: 0; margin: 0;">X</span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th style="border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    drugu vrstu(navesti koju)
                                </th>
                                <th style="padding: 0; border: 1px solid black; font-size: 0.8rem; font-weight: normal; height: 1.2rem;">
                                    <xsl:if test="//z:vrsta_znaka/z:vrsta_custom[text() != '']">
                                        <span style="font-weight: normal; padding: 0; margin: 0;"><xsl:value-of select="//z:vrsta_znaka/z:vrsta_custom" /></span>
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="min-height: 4rem">
                                        <span style="font-weight: bold; font-size: 1rem; padding: 0.3rem 0.3rem 0rem">5. Naznacenje boje, odnosno boja<br/> <span style="font-weight: bold; font-size: 1rem; padding: 0.3rem 0 0rem 0.3rem">iz kojih se znak sastoji:</span></span>
                                        <span style="font-weight: bold; font-size: 0.8rem; padding-left: 0.3rem">
                                            <xsl:for-each select="//z:boje//z:boja">
                                                <xsl:if test="position() = last()">
                                                    <span style="font-weight: normal; font-size: 0.9rem; padding: 0; margin: 0;"><xsl:value-of select="z:naziv"/></span>
                                                </xsl:if>
                                                <xsl:if test="not(position() = last())">
                                                    <span style="font-weight: normal; font-size: 0.9rem; padding: 0; margin: 0;"><xsl:value-of select="z:naziv"/>,&#160;</span>
                                                </xsl:if>
                                            </xsl:for-each>
                                        </span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="min-height: 4rem">
                                        <span style="font-weight: bold; font-size: 1rem; padding-left: 0.3rem">6. Transliteracija znaka*:</span>
                                        <br></br>
                                        <xsl:if test="not(//@pismo = 'Cirilica' or //@pismo = 'Latinica')">
                                            <span style="font-weight: normal; padding: 0; margin: 0;">&#160;<xsl:value-of select="//z:transliteracija_znaka"/></span>
                                        </xsl:if>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="min-height: 4rem">
                                        <span style="font-weight: bold; font-size: 1rem; padding-left: 0.3rem">7. Prevod znaka*:</span>
                                        <br></br>
                                        <xsl:if test="not(//z:znak/@pismo = 'Cirilica' or //z:znak/@pismo = 'Latinica')">
                                            <span style="font-weight: normal; padding: 0; margin: 0;">&#160;<xsl:value-of select="//z:prevod"/></span>
                                        </xsl:if>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="3" style="text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="min-height: 4rem">
                                        <span style="font-weight: bold; font-size: 1rem; padding-left: 0.3rem">8. Opis znaka:</span>
                                        <span style="margin-left: 0.3rem"><br />&#160;<xsl:value-of select="//z:opis" /></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="padding: 0.3rem 0 0.3rem 0.3rem;">
                                        <span style="min-height: 0.8rem; font-size: 1rem;"><b>9. Zaokružiti broj klase robe i usluga prema Nicanskoj klasifikaciji:</b></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal;">
                                    <div style="display: flex; font-size: 1.5rem; padding: 0.5rem; margin: 0;">
                                        <xsl:choose>
                                            <xsl:when test="//z:nicanska_klasifikacija/z:broj[text() = '1. Hemijski proizvodi']">
                                                <span style="border: 1px solid black; border-style: solid; border-color: red; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">1</span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span style="border: 1px solid black; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">1</span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                        <xsl:choose>
                                            <xsl:when test="//z:nicanska_klasifikacija/z:broj[text() = '2. Boje i lakovi']">
                                                <span style="border: 1px solid black; border-style: solid; border-color: red; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">1</span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span style="border: 1px solid black; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">2</span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                        <xsl:choose>
                                            <xsl:when test="//z:nicanska_klasifikacija/z:broj[text() = '3. Nemedicinska kozmetika']">
                                                <span style="border: 1px solid black; border-style: solid; border-color: red; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">1</span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span style="border: 1px solid black; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">3</span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                        <xsl:choose>
                                            <xsl:when test="//z:nicanska_klasifikacija/z:broj[text() = '4. Industrija ulja i masti']">
                                                <span style="border: 1px solid black; border-style: solid; border-color: red; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">1</span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span style="border: 1px solid black; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">4</span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                        <xsl:choose>
                                            <xsl:when test="//z:nicanska_klasifikacija/z:broj[text() = '5. Farmaceutski proizvodi']">
                                                <span style="border: 1px solid black; border-style: solid; border-color: red; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">1</span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span style="border: 1px solid black; padding-left: 0.3rem; padding-right: 0.3rem; margin: 0;">5</span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </div>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal; border: 1px solid black;">
                                    <p style="padding: 0.3rem 0 0.3rem 0.3rem;">
                                        <span style="min-height: 0.8rem; font-size: 1rem;"><b>10. Zatrazeno pravo prvenstva i osnov:</b></span>
                                    </p>
                                </th>
                            </tr>

                            <tr>
                                <th colspan="6" style="min-width: 48rem; text-align: left; font-weight: normal;">
                                    <p style="min-height: 4rem">
                                        <xsl:if test="//@zatrazeno = 'true'">
                                            <span style="font-weight: normal; margin-left: 0.3rem;"><xsl:value-of select="//z:osnov" /></span>
                                        </xsl:if>
                                    </p>
                                </th>
                            </tr>

                        </table>
                    </div>

                    <p style="margin-left: 4rem;">*Popuniti samo ako je znak ili element znaka ispisan slovima koja nisu ćirilica ili latinica</p>

                    <div class="center" style="padding: 1.4rem;">
                        <table style="border: 1px solid black; border-collapse: collapse; text-align: left;">
                            <tr style="min-height: 3rem">
                                <th style="text-align: left; border-right: 1px solid black; width: 20rem; padding-left: 0.3rem; font-size: 1rem;">
                                    <span><b>11. Placene takse:</b></span>
                                </th>
                                <th style="text-align: left; border-right: 1px solid black; padding-left: 0.3rem; font-size: 1rem; width: 6rem;"><span><b>Dinara</b></span></th>
                                <th rowspan="4" style="width: 20rem; text-align: center"><b>Potpis podnosioca zahteva</b></th>
                            </tr>
                            <tr style="min-height: 3rem">
                                <th style="text-align: left; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><b>a) osnovna taksa</b></span></th>
                                <th style="text-align: left; font-weight:normal; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><xsl:value-of select="//z:osnovna_taksa"/></span></th>
                            </tr>
                            <tr style="min-height: 3rem">
                                <th style="text-align: left; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><b>b) za klasu</b></span></th>
                                <th style="text-align: left; font-weight:normal; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><xsl:value-of select="//z:taksa_za_klasu"/></span></th>
                            </tr>
                            <tr style="min-height: 3rem">
                                <th style="text-align: left; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><b>v) za graficko resenje</b></span></th>
                                <th style="text-align: left; font-weight:normal; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><xsl:value-of select="//z:taksa_za_graficko_resenje"/></span></th>
                            </tr>
                            <tr style="min-height: 3rem">
                                <th style="text-align: left; border: 1px solid black; padding: 0.3rem;"><span><b>UKUPNO</b></span></th>
                                <th style="text-align: left; font-weight:normal; border: 1px solid black; padding: 0.3rem;  font-size: 0.8rem;"><span><xsl:value-of select="//z:ukupno"/></span></th>
                            </tr>
                        </table>
                    </div>

                    <div class="center" style="padding: 1.4rem; font-size: 0.8rem;">
                        <table style="border: 1px solid black; border-collapse: collapse; text-align: left;">
                            <tr style="border: 1px solid black; height: 1.5rem">
                                <th style="width: 46rem; text-align: center; font-size: 1.2rem;" colspan="3">Popunjava zavod</th>
                            </tr>

                            <tr>
                                <th colspan="2" style="border: 1px solid black; width: 30rem; font-size: 0.8rem; height: 2rem;"><b>Prilozi uz zahtev:</b></th>
                                <th  rowspan="9" style="border: 1px solid black; width: 16rem; font-size: 0.8rem; text-align: center">
                                    <span style="display: block">Broj prijave ziga:</span>
                                    <span style="display: block; margin-top: 1rem; font-size: 1.3rem;"><xsl:value-of select="//@broj_prijave" /></span>
                                    <span style="display: block; margin-top: 1rem;"><b>Datum podnosenja:</b></span>
                                    <span style="display: block; margin-top: 1rem;"><b><xsl:value-of select="//@datum_podnosenja" /></b></span>
                                </th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Primerak znaka</span></th>
                                <th style="text-align: left; border: 1px solid black; width: 5rem; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:primerak_znaka = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Spisak robe i usluga**</span></th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:spisak_roba_i_usluga = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;">Punomocje</th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:punomocje = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Generalno punomocje ranije prilozeno</span></th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:generalno_punomocje_ranije_prilozeno = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Punomocje ce biti naknadno dostavljeno</span></th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:punomocje_ce_biti_naknadno_dostavljeno = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Opsti akt o kolektivnom zigu/zigu garancije</span></th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:opsti_akt = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Dokaz o pravu prvenstva</span></th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;">
                                    <xsl:if test="//z:popunjava_zavod/z:dokaz_o_pravu_prvenstva = 'true'">
                                        X
                                    </xsl:if>
                                </th>
                            </tr>

                            <tr style="height: 2rem">
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>Dokaz o uplati takse</span></th>
                                <th style="text-align: left; border: 1px solid black; font-size: 0.8rem;"><span>
                                    <xsl:if test="//z:popunjava_zavod/z:dokaz_o_uplati_takse = 'true'">
                                        X
                                    </xsl:if>
                                </span></th>
                            </tr>

                        </table>
                    </div>

                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>