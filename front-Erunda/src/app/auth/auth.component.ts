import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: String;
  password: String;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  authorizationClick(){
    const user = {
      login : this.login,
      password : this.password
    };

    if(user.password==undefined){
      this.flashMessages.show("Введите пароль", {cssClass: 'alert-danger', timeout: 4000});
      return false;
    };
    this.accountService.authUser(user).subscribe(data=>{
      if(!data.success){
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 4000});
      } else{
        this.router.navigate(['/cabinet']);
        this.accountService.storeUser(data.token, data.user);
      }
    })
  }

}
