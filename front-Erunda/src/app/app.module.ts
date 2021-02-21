import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from  '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { CheckRegistrationService  } from  './check-registration.service';
import { AccountService } from './account.service';

const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {path: 'reg', component: RegComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'cabinet', component: CabinetComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    CabinetComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [CheckRegistrationService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
