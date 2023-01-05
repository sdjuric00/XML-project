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
                <title>Resenje</title>
            </head>
            <body class="background-body">
                <div class="content" style="height: 70%">
                    <br></br>
                    <h1 style="text-align: center; margin-bottom: 0;">Rešenje za podneti zahtev pod brojem <xsl:value-of select="//@referenca_na_zahtev" /></h1>
                    <img style="float: right; margin-top: -4rem;">
                        <xsl:attribute name="src">
                            <xsl:value-of select="concat('http://localhost:8083/qr-code/resenje-', //@id, '.png')"/>
                        </xsl:attribute>
                    </img>
                    <p style="text-align: center; margin-top: 0.3rem;">
                        <xsl:choose>
                            <xsl:when test="//razlog_odbijanja">
                                <span style="text-align: center; font-weight: bold; font-size: 1.4rem; color: red;">Zahtev je odbijen!</span>
                            </xsl:when>
                            <xsl:otherwise>
                                <span style="text-align: center; font-weight: bold; font-size: 1.4rem; color: green;">Zahtev je prihvacen, cestitamo!</span>
                            </xsl:otherwise>
                        </xsl:choose>
                    </p>
                    <br />
                    <br />
                    <br />
                    <p style="margin-left: 2rem; font-size: 1.1rem;">
                        <xsl:choose>
                            <xsl:when test="//razlog_odbijanja">
                                <span style="font-weight: bold;">Razlog odbijanja:&#160;<xsl:value-of select="//razlog_odbijanja" /></span>
                            </xsl:when>
                            <xsl:otherwise>
                                <span>Šifra obradjenog zahteva:&#160;<xsl:value-of select="//sifra_obradjenog_zahteva" /></span>
                            </xsl:otherwise>
                        </xsl:choose>
                    </p>
                    <p style="margin-left: 2rem; font-size: 1.1rem;">Sluzbenik koji je obradio zahtev: <xsl:value-of select="//ime_prezime_sluzbenika" /></p>
                    <p style="margin-left: 2rem; font-size: 1.1rem;">Datum kada je obradjen zahtev: <xsl:value-of select="//datum_obrade" /></p>
                    <div style="height: 140rem;"></div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>