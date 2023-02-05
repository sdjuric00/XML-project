<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0"
                xmlns:z="http://ftn.ac.rs/izvestaj">
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
                <title>Izvestaj</title>
            </head>
            <body class="background-body">
                <div class="content">
                    <br></br>
                    <h1 style="text-align: center; margin-bottom: 0;">Izveštaj za period<br /> od <xsl:value-of select="//z:pocetni_datum" /> do <xsl:value-of select="//z:krajnji_datum" /></h1>
                    <br />
                    <br />
                    <p style="margin-left: 2rem;">
                        <xsl:for-each select="//z:izvestaji/z:izvestaj_podaci">
                            <xsl:if test="@tip_izvestaja = 'autorsko_pravo'">
                                <span style="display: block; font-size: 1.4rem;">Statistika zahteva za izdavanje autorskih prava:</span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj nepregledanih:&#160;<b><xsl:value-of select="z:broj_nepregledanih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj odbijenih:&#160;<b><xsl:value-of select="z:broj_odbijenih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj prihvacenih:&#160;<b><xsl:value-of select="z:broj_prihvacenih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;"><b>-UKUPNO:&#160;</b><b><xsl:value-of select="z:ukupan_broj" /></b></span>
                                <br/>
                            </xsl:if>
                            <xsl:if test="@tip_izvestaja = 'patent'">
                                <span style="display: block; font-size: 1.4rem;">Statistika zahteva za izdavanje patenta:</span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj nepregledanih:&#160;<b><xsl:value-of select="z:broj_nepregledanih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj odbijenih:&#160;<b><xsl:value-of select="z:broj_odbijenih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj prihvacenih:&#160;<b><xsl:value-of select="z:broj_prihvacenih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;"><b>-UKUPNO:&#160;</b><b><xsl:value-of select="z:ukupan_broj" /></b></span>
                                <br />
                            </xsl:if>
                            <xsl:if test="@tip_izvestaja = 'zig'">
                                <span style="display: block; font-size: 1.4rem;">Statistika zahteva za izdavanje zigova:</span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj nepregledanih:&#160;<b><xsl:value-of select="z:broj_nepregledanih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj odbijenih:&#160;<b><xsl:value-of select="z:broj_odbijenih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;">-Broj prihvacenih:&#160;<b><xsl:value-of select="z:broj_prihvacenih" /></b></span>
                                <span style="display: block; margin-left: 3.5rem;"><b>-UKUPNO:</b>&#160;<b><xsl:value-of select="z:ukupan_broj" /></b></span>
                                <br />
                            </xsl:if>
                        </xsl:for-each>
                    </p>
                    <div style="height: 50rem;">

                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>