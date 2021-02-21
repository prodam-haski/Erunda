import { Component, OnInit } from '@angular/core';
import { CheckRegistrationService } from '../check-registration.service';
import { AccountService } from '../account.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String;
  login: String;
  password: String;
  confirmedPassword: String;

  constructor(
    private checkForm: CheckRegistrationService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  registrationClick(){
    const user = {
      name : this.name,
      login : this.login,
      password : this.password
//      confirmedPassword : this.confirmedPassword
    };

    if (!this.checkForm.checkName(user.name)){
      this.flashMessages.show("Введите имя", {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }
    if (!this.checkForm.checkLogin(user.login)){
      this.flashMessages.show("Введите логин", {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }
    if (!this.checkForm.checkPassword(user.password)){
      this.flashMessages.show("Введите пароль", {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }
    if (!this.checkForm.checkConfirmedPassword(this.confirmedPassword)){
      this.flashMessages.show("Подтвердите пароль", {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }
    if (!this.checkForm.comparePasswords(user.password, this.confirmedPassword)){
      this.flashMessages.show("Пароли не совпадают", {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }
    this.accountService.registerUser(user).subscribe(data=>{
      if(!data.success){
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/reg']);
      }
      else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['/auth']);
      }});
  }
}
