import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterUppercase } from 'src/app/validators/first-letter-uppercase';
import { genreCreationDTO } from '../genres.model.ts';
import { GenresService } from '../genres.service';
import { parseWebAPIErrors } from 'src/app/utilities/utils';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {
  form!: FormGroup;
  errors: string[] = [];

  constructor(private router: Router, private genresService: GenresService) { }

  ngOnInit(): void {
  }

  saveChanges(genreCreationDTO: genreCreationDTO): void {
    this.genresService.create(genreCreationDTO).subscribe(() => {
      this.router.navigate(['/genres']);
    }, error => this.errors = parseWebAPIErrors(error));
  }

}
