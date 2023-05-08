import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { movieTheatersCreationDTO, movieTheatersDTO } from './movie-theaters.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  private apiURL = environment.apiURL + '/movietheaters';

  constructor(private http: HttpClient) { }

  public create(movieTheaterDTO: movieTheatersCreationDTO) {
    var observer = this.http.post(this.apiURL, movieTheaterDTO);
    return observer;
  }

  public getById(id: number): Observable<movieTheatersDTO> {
    return this.http.get<movieTheatersDTO>(`${this.apiURL}/${id}`);
  }

  public get(): Observable<movieTheatersDTO[]> {
    return this.http.get<movieTheatersDTO[]>(this.apiURL);
  }

  public edit(id: number, movieTheaterDTO: movieTheatersCreationDTO) {
    return this.http.put(`${this.apiURL}/${id}`, movieTheaterDTO);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}
