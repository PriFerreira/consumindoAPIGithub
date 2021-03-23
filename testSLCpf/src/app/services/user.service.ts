import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    private url = 'https://api.github.com/users'; 
    private userName: string;

  constructor( private http: HttpClient ) {
      this.userName = '';     
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUser(userName): Observable<any[]> {

    this.userName = userName;
    
    if (this.userName) {
      return this.http
      .get(this.url + '/' + this.userName)
      .pipe( 
        map((data: any) => data),
        catchError(this.handleError)
      );
    }

  }

  getRepositories(userName){

    this.userName = userName;

    if (this.userName) {
      return this.http
      .get(this.url + '/' + this.userName + '/repos')
      .pipe( 
        map((data: any) => data),
        catchError(this.handleError)
      );
    }

  }

  getUsers(): Observable<User[]> {

    return this.http
    .get<User[]>(this.url)
    .pipe(
        retry(2),
        catchError(this.handleError)
    )
    
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent)
      errorMessage = error.error.message;
    else
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
  
    return throwError(errorMessage);
  };

}
