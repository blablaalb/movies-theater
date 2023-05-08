import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, icon, Icon } from 'leaflet';
import { coordinatesMap, coordinatesMapWithMessage } from './coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Angular Movies' })
    ],
    zoom: 12,
    center: latLng(41.746453680185326, -315.1881408691407)
  };

  layers: Marker<any>[] = [];

  @Output()
  onSelectedLocation = new EventEmitter<coordinatesMap>();

  @Input()
  initialCoordinates: coordinatesMapWithMessage[] = [];

  @Input()
  editMode: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map(value => {
      const m = marker([value.latitude, value.longitude])
      if (value.message) {
        m.bindPopup(value.message, { autoClose: false, autoPan: false });
      }
      return m;
    });
  }


  handleMapClick(event: LeafletMouseEvent): void {
    if (this.editMode) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log({ latitude, longitude });
      this.layers = [];
      this.layers.push(marker([latitude, longitude]));
      this.onSelectedLocation?.emit({ latitude, longitude });
    }
  }

}
