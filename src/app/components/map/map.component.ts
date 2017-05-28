import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
/*Aqui estan las variables que estabamos enviando a la etiqueta HTML sebm-google-map
por medio de la clase MapComponent estamos indicando la latitud, longitud
el zoom que nos indica que tan cerca se tiene que ver y la etiqueta del nombre del
restaurante*/
export class MapComponent implements OnInit {
  title="Nuestra ubicación";
  lat: number = 18.815809;
  lng: number = -98.953232;
  zoom:number = 20;
  label: string = "Gondola Restaurant";
  constructor() { }

  ngOnInit() {
  }

}
