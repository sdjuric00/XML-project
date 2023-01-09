import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patent } from 'src/app/model/patent/xml/patent';
import { PatentApplicationService } from 'src/app/service/patent-application.service';
import { XonomyService } from 'src/app/service/xonomy.service';

declare const Xonomy: any;
@Component({
  selector: 'app-rich-edit-komponenta',
  templateUrl: './rich-edit-komponenta.component.html',
  styleUrls: ['./rich-edit-komponenta.component.css']
})
export class RichEditKomponentaComponent implements OnInit, AfterViewInit{
  constructor(
    private xonomyService: XonomyService, private patentService: PatentApplicationService,
    private toast: ToastrService, private router: Router
    ) { }
  ngOnInit() {
  }


  ngAfterViewInit() {
    let element = document.getElementById("editor");
    let specification = this.xonomyService.patentSpecification;
    let xmlString = '<zahtev_za_priznavanje_patenta xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.patent/patent" xmlns:opste="http://ftn.ac.rs/opste" '+
    'broj_prijave="P-2022/2" datum_prijema="2022-11-30" priznati_datum_podnosenja="2022-11-30" id="1" pregledano="false">'+
    '<institucija><naziv>Zavod za intelektulanu svojinu</naziv>' +
    '<adresa><grad>Beograd</grad>'+
    '<ulica>Kneginje Ljubice</ulica>'+
    '<broj>5</broj>'+
    '<postanski_broj>11000</postanski_broj>'+
    '<drzava>Republika Srbija</drzava></adresa>'+
    '</institucija></zahtev_za_priznavanje_patenta>';
    Xonomy.render(xmlString, element, specification);
    Xonomy.startKeyNav();
  }
  send() {
    let text = Xonomy.harvest();
    text = text.replaceAll("xml:space='preserve'","").replaceAll(" >",">");
    console.log(text);
    text = text.replaceAll("naziv>","opste:naziv>").replaceAll("<naziv>","<opste:naziv>").replaceAll("adresa","opste:adresa").replaceAll("<grad", "<opste:grad").replaceAll("</grad", "</opste:grad")
          .replaceAll("ulica", "opste:ulica").replaceAll("<broj","<opste:broj").replaceAll("/broj","/opste:broj").replaceAll("postanski_broj","opste:postanski_broj")
          .replaceAll("drzava", "opste:drzava").replaceAll("<ime>", "<opste:ime>").replaceAll("</ime>","</opste:ime>").replaceAll("/prezime>","/opste:prezime>").replaceAll("<prezime","<opste:prezime")
          .replaceAll("jmbg", "opste:jmbg").replaceAll("kontakt","opste:kontakt").replaceAll("email","opste:email")
          .replaceAll("telefon","opste:telefon").replaceAll("fax","opste:fax").replaceAll("pib","opste:pib")
          .replaceAll("registarski_broj","opste:registarski_broj").replaceAll("<podnosilac autor='false'><fizicko_lice>", "<podnosilac autor='false'><opste:fizicko_lice>")
          .replaceAll("podnosilac autor='true'><fizicko_lice>", "podnosilac autor='true'><opste:fizicko_lice>").replaceAll("</fizicko_lice></podnosilac>", "</opste:fizicko_lice></podnosilac>")
          .replaceAll("pismeno='false'><opste:adresa>", "pismeno='false'><adresa>").replaceAll("pismeno='true'><opste:adresa>", "pismeno='true'><adresa>")
          .replaceAll("</opste:adresa></dostavljanje>","</adresa></dostavljanje>");
        
    //  text = `<zahtev_za_priznavanje_patenta dopunska_prijava='false' broj_prijave='P-2022/2' datum_prijema='2022-11-30' priznati_datum_podnosenja='2022-11-30' id='1' pregledano='false' xmlns:xs='http://www.w3.org/2001/XMLSchema' xmlns='http://www.patent/patent' xmlns:opste='http://ftn.ac.rs/opste'><institucija><opste:naziv>Zavod za intelektulanu svojinu</opste:naziv><opste:adresa><opste:grad >Beoopste:grad</opste:grad><opste:ulica >Kneginje Ljubice</opste:ulica><opste:broj >5</opste:broj><opste:postanski_broj>11000</opste:postanski_broj><opste:drzava >Republika Srbija</opste:drzava></opste:adresa></institucija><podaci_o_pronalasku><naziv jezik='engleski' >pera</naziv><naziv jezik='srpski' >hdhas</naziv></podaci_o_pronalasku><podnosilac autor='false'><opste:fizicko_lice><opste:ime >pera</opste:ime><opste:prezime>peric</opste:prezime><opste:jmbg >1202001785023</opste:jmbg><opste:kontakt><opste:email >ana@gmail.com</opste:email><opste:telefon >0692742947</opste:telefon><opste:fax >036376448</opste:fax></opste:kontakt><opste:adresa><opste:grad >Kraljevo</opste:grad><opste:ulica >Bozidara Milunovica</opste:ulica><opste:broj >7</opste:broj><opste:postanski_broj >36000</opste:postanski_broj><opste:drzava >Srbija</opste:drzava></opste:adresa></opste:fizicko_lice></podnosilac><pronalazac anonimno='true'><anonimni_pronalazac/></pronalazac><punomocnik za_prijem_pismeno='false' za_zastupanje='false'><pravno_lice><opste:naziv >fdf</opste:naziv><opste:pib >123456789</opste:pib><opste:registarski_broj >12345678</opste:registarski_broj><opste:kontakt><opste:email >ana@gmail.com</opste:email><opste:telefon >0692742947</opste:telefon><opste:fax >036376448</opste:fax></opste:kontakt><opste:adresa><opste:grad >Kraljevo</opste:grad><opste:ulica >Bozidara Milunovica</opste:ulica><opste:broj >7</opste:broj><opste:postanski_broj>36000</opste:postanski_broj><opste:drzava >Srbija</opste:drzava></opste:adresa></pravno_lice></punomocnik><dostavljanje elektronski='false' pismeno='true'><opste:adresa><opste:grad >Kraljevo</opste:grad><opste:ulica >Bozidara Milunovica</opste:ulica><opste:broj >7</opste:broj><opste:postanski_broj >36000</opste:postanski_broj><opste:drzava >Srbija</opste:drzava></opste:adresa></dostavljanje><zahtev_za_priznanje_prava_iz_ranijih_prijava/></zahtev_za_priznavanje_patenta>`;
     
    console.log(text);
    const _toast: ToastrService = this.toast;
    const that = this;
    this.patentService.create(text as Patent, false).subscribe({
        next(response) {
            console.log(response["body"]);
            _toast.success('Uspešno ste poslali zahtev za priznavanje patenta.', 'Uspešno slanje');
            that.router.navigate([`/zahtev-patent/obrada/${response["body"]}`]);
          },
          error(): void {
           _toast.error('Desila se greška prilikom slanja zahteva!', 'Greška');
          }});
  }

}

