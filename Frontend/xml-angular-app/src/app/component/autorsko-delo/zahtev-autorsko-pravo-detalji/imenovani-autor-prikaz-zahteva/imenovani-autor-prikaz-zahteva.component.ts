import {Component, Input, OnInit} from '@angular/core';
import {AutorObj} from "../../../../model/autorsko-pravo/obj/autor";

@Component({
  selector: 'app-imenovani-autor-prikaz-zahteva',
  templateUrl: './imenovani-autor-prikaz-zahteva.component.html',
  styleUrls: ['./imenovani-autor-prikaz-zahteva.component.css']
})
export class ImenovaniAutorPrikazZahtevaComponent implements OnInit {

  @Input() autor: AutorObj;

  constructor() {
  }

  ngOnInit(): void {
  }

}
