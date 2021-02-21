import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  token: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(
      'http://localhost:3000/account/reg',
      user,
      {headers: headers}).pipe(map(res => res.json()));
  }

  authUser(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(
      'http://localhost:3000/account/auth',
      user,
      {headers: headers}).pipe(map(res => res.json()));
  }

  storeUser(token, user){
    this.token = token;
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

}
