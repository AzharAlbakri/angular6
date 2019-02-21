import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private heroesUrl = 'getUser'; 

  constructor(private http: HttpClient) { }


  getUser (): Observable<User> {
    console.log(this.http.get<User>(this.heroesUrl));
    return this.http.get<User>(this.heroesUrl)
  }
}
