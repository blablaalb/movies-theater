import { Component, OnInit } from '@angular/core';
import { movieTheatersCreationDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styleUrls: ['./create-movie-theater.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor(private movieTheaterService: MovieTheatersService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(movieTheater: movieTheatersCreationDTO): void {
    console.log(movieTheater);
    this.movieTheaterService.create(movieTheater).subscribe(() => this.router.navigate(['/movietheaters']));
  }

}
