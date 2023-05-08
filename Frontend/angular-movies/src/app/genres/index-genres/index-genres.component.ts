import { Component, OnInit } from '@angular/core';
import { GenresService } from '../genres.service';
import { genreDTO } from '../genres.model.ts';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {
  genres!: genreDTO[];
  columnsToDisplay = ['name', 'actions'];

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres() {
    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;
    });
  }

  delete(id: number) {
    this.genresService.delete(id).subscribe(() => {
      this.loadGenres();
    });
  }

}
