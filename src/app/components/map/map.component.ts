import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
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
