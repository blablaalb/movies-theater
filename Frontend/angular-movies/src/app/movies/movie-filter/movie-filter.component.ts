import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from '../movies.service';
import { genreDTO } from 'src/app/genres/genres.model.ts';
import { movieDTO } from '../movies.model';
import { GenresService } from 'src/app/genres/genres.service';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {
  form!: FormGroup;
  genres: genreDTO[] = [];
  movies: movieDTO[] = [];
  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  totalAmountOfRecords: string = '0';

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private genresService: GenresService, private location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false
    });

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;

      this.filterMovies(this.form.value);

      this.form.valueChanges.subscribe(values => {
        this.filterMovies(values);
        this.writeParametersInURL();
      })
    })

  }

  filterMovies(values: any): void {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.moviesService.filter(values).subscribe((response: HttpResponse<movieDTO[]>) => {
      var movies = response.body ? response.body : [];
      this.movies = movies;
      this.totalAmountOfRecords = String(response.headers.get("totalAmountOfRecords"));
    });
  }

  private readParametersFromURL() {
    this.activatedRoute.queryParams.subscribe(params => {
      var obj: any = {};

      if (params['title']) {
        obj.title = params['title'];
      }

      if (params['genreId']) {
        obj.genreId = Number(params['genreId']);
      }

      if (params['upcomingReleases']) {
        obj.upcomingReleases = params['upcomingReleases'];
      }

      if (params['inTheaters']) {
        obj.inTheaters = params['inTheaters'];
      }

      if (params["page"]) {
        this.currentPage = params["page"];
      }

      if (params["recordsPerPage"]) {
        this.recordsPerPage = params["recordsPerPage"];
      }

      this.form.patchValue(obj);
    });
  }

  private writeParametersInURL() {
    const queryString: string[] = [];
    const formValues = this.form.value;

    if (formValues.title) {
      queryString.push(`title=${formValues.title}`);
    }

    if (formValues.genreId != '0') {
      queryString.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.upcomingReleases) {
      queryString.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }

    if (formValues.inTheaters) {
      queryString.push(`inTheaters=${formValues.inTheaters}`);
    }

    queryString.push(`page=${this.currentPage}`);
    queryString.push(`recordsPerPage=${this.recordsPerPage}`);

    this.location.replaceState('movies/filter', queryString.join('&'));
  }

  paginatorUpdate(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.writeParametersInURL();
    this.filterMovies(this.form.value);
  }

  clearForm(): void {
    this.form.patchValue(this.initialFormValues);
  }

  onDelete() {
    this.filterMovies(this.form.value);
  }
}
