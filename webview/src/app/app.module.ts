import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatSelectModule, MatSlideToggleModule,
  MatToolbarModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {RequestService} from "./services/request.service";
import {ValidatorService} from "./services/validator.service";
import {DataService} from "./services/data.service";
import {AuthGuardService} from "./guards/auth.guard";

const appRoutes: Routes = [
  {path: '', component: HomeComponent,canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [RequestService, ValidatorService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
