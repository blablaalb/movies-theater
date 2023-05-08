import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterUppercase } from 'src/app/validators/first-letter-uppercase';
import { EventEmitter } from '@angular/core';
import { genreCreationDTO } from '../genres.model.ts';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.css']
})
export class FormGenreComponent implements OnInit {
  form!: FormGroup;
  @Output()
  onSaveChanges: EventEmitter<genreCreationDTO> = new EventEmitter<genreCreationDTO>();
  @Input()
  model!: genreCreationDTO;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [
          Validators.required
          ,Validators.minLength(3)
          ,firstLetterUppercase()
        ]
      }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  saveChanges(): void {
    this.onSaveChanges?.emit(this.form.value);
  }

  getErrorMessageFieldName(): string {
    const field = this.form.get('name');
    if (field?.hasError('required')) {
      return 'The name field is required';
    }

    if (field?.hasError('minlength')) {
      return 'The minimum length is 3'
    }

    if (field?.hasError('firstLetterUppercase')) {
      return field.getError('firstLetterUppercase').message;
    }

    return '';
  }


}
