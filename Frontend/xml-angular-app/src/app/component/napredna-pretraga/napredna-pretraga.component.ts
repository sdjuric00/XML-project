import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ZahtevAutorskoPravoOsnovneInformacije } from 'src/app/model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije';
import { ZahtevPatentOsnovneInformacije } from 'src/app/model/patent/obj/zahtev-patent-osnovne-informacije';
import { ZahtevZigOsnovneInformacije } from 'src/app/model/zig/obj/zahtev-zig-osnovne-informacije';

@Component({
  selector: 'app-napredna-pretraga',
  templateUrl: './napredna-pretraga.component.html',
  styleUrls: ['./napredna-pretraga.component.css']
})
export class NaprednaPretragaComponent implements OnInit {

  naprednaPretragaForm: FormGroup;
  constructor(private fb: FormBuilder, private _toast: ToastrService) { 
    this.naprednaPretragaForm = this.fb.group({
      naziv: ["", Validators.required],
      vrednosti: this.fb.array([ this.novaVrednost() ])
   });
  }
  ngOnInit(): void {
  }


  operatori = ["I", "ILI", "NE"];
  listaZahtevaPatenti: ZahtevPatentOsnovneInformacije[];
  listaZahtevaAutorskaPrava: ZahtevAutorskoPravoOsnovneInformacije[];
  listaZahtevaZigova: ZahtevZigOsnovneInformacije[];
  prikaziZigove = false;
  prikaziPatente = false;
  prikaziAutorskaPrava = false;


  // vrednosti=[new FormControl("")]

  dodajNovuVrednost(){

    (this.naprednaPretragaForm.get('vrednosti') as FormArray).push(this.novaVrednost())
    console.log(this.naprednaPretragaForm);
  }

  novaVrednost(): FormGroup{
    return this.fb.group({
      vrednost:["", Validators.required],
      operator:["", Validators.required]
    });
  }

  get vrednosti(){
    return this.naprednaPretragaForm.get('vrednosti')['controls'];
  }

  pretrazi(){
    //<napedna-pretraga>
    //  <naziv></naziv>
    //  <vrednosti>
    //    <vrednost></vrednost>
    //    <operator></operator>
    //   </vrednosti>
    // </napedna-pretraga>
    if(this.validirajPolja()){
      console.log("anaa");
    }
    else{
      this._toast.error("Nemoguce je izvrsiti pretragu, nisu sva polja validna!", "NEVALIDNA POLJA");
    }
  }

  validirajPolja(): boolean{
    if(this.naprednaPretragaForm.invalid){
      return false
    }
    return true;
  }

}
