import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coordinatesMap } from 'src/app/utilities/map/coordinate';
import { movieTheatersCreationDTO, movieTheatersDTO } from '../movie-theaters.model';

@Component({
  selector: 'app-movie-theater-form',
  templateUrl: './movie-theater-form.component.html',
  styleUrls: ['./movie-theater-form.component.css']
})
export class MovieTheaterFormComponent implements OnInit {
  form!: FormGroup;
  @Output()
  onSaveChanges = new EventEmitter<movieTheatersCreationDTO>();
  @Input()
  model!: movieTheatersDTO;

  initialCoordinates: coordinatesMap[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      longitude: ['', {
        validators: [Validators.required]
      }],
      latitude: ['', {
        validators: [Validators.required]
      }],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.initialCoordinates.push({ latitude: this.model.latitude, longitude: this.model.longitude });
    }
  }

  saveChanges(): void {
    this.onSaveChanges?.emit(this.form.value);
  }

  onSelectedLocation(coordinates: coordinatesMap): void {
    this.form.patchValue(coordinates);
  }

}
