import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckRegistrationService {

  constructor() { }

  checkLogin(login){
    if(login == undefined) return false;
    else return true;
  }

  checkName(name){
    if(name == undefined) return false;
    else return true;
  }

  checkPassword(password){
    if(password == undefined) return false;
    else return true;
  }

  checkConfirmedPassword(confirmedPassword){
    if(confirmedPassword == undefined) return false;
    else return true;
  }

  comparePasswords(password, confirmedPassword){
    if(password == confirmedPassword) return true;
    else return false;
  }

}
