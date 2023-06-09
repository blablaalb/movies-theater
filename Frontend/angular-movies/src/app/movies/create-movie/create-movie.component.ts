import { Component, OnInit } from '@angular/core';
import { movieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  nonSelectedGenres!: multipleSelectorModel[];
  nonSelectedMovieTheaters!: multipleSelectorModel[];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        return <multipleSelectorModel>{ key: genre.id, value: genre.name };
      });
      this.nonSelectedMovieTheaters = response.movieTheaters.map(movieTheater => {
        return <multipleSelectorModel>{ key: movieTheater.id, value: movieTheater.name }
      });
    });
  }

  saveChanges(movieCreationDTO: movieCreationDTO): void {
    console.log(movieCreationDTO);
    this.moviesService.create(movieCreationDTO).subscribe(id => {
      this.router.navigate(['/movie/' + id]);
    });
  }
}
