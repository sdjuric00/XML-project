<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0">
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
                    <h1 style="text-align: center; margin-bottom: 0;">Izveštaj za period od <xsl:value-of select="//pocetni_datum" /> do <xsl:value-of select="//krajnji_datum" /></h1>
                    <br />
                    <br />
                    <p>
                        <xsl:for-each select="//izvestaji/izvestaj_podaci">
                            <xsl:if test="@tip_izvestaja = 'autorsko_pravo'">
                                <span style="display: block;">Statistika zahteva za izdavanje autorskih prava:</span>
                                <br />
                                <span style="display: block;">Broj nepregledanih:&#160;<xsl:value-of select="broj_nepregledanih" /></span>
                                <span style="display: block;">Broj odbijenih:&#160;<xsl:value-of select="broj_odbijenih" /></span>
                                <span style="display: block;">Broj prihvacenih:&#160;<xsl:value-of select="broj_prihvacenih" /></span>
                                <span style="display: block;">UKUPNO:&#160;<xsl:value-of select="ukupan_broj" /></span>
                            </xsl:if>
                            <xsl:if test="@tip_izvestaja = 'patent'">
                                <span style="display: block;">Statistika zahteva za izdavanje patenta:</span>
                                <br />
                                <span style="display: block;">Broj nepregledanih:&#160;<xsl:value-of select="broj_nepregledanih" /></span>
                                <span style="display: block;">Broj odbijenih:&#160;<xsl:value-of select="broj_odbijenih" /></span>
                                <span style="display: block;">Broj prihvacenih:&#160;<xsl:value-of select="broj_prihvacenih" /></span>
                                <span style="display: block;">UKUPNO:&#160;<xsl:value-of select="ukupan_broj" /></span>
                            </xsl:if>
                            <xsl:if test="@tip_izvestaja = 'zig'">
                                <span style="display: block;">Statistika zahteva za izdavanje zigova:</span>
                                <br />
                                <span style="display: block;">Broj nepregledanih:&#160;<xsl:value-of select="broj_nepregledanih" /></span>
                                <span style="display: block;">Broj odbijenih:&#160;<xsl:value-of select="broj_odbijenih" /></span>
                                <span style="display: block;">Broj prihvacenih:&#160;<xsl:value-of select="broj_prihvacenih" /></span>
                                <span style="display: block;">UKUPNO:&#160;<xsl:value-of select="ukupan_broj" /></span>
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