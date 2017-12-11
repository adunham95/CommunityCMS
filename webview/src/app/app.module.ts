import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldControl, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule, MatTableModule,
  MatToolbarModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RegisterCardComponent} from "./register-card/register-card.component";

import {RequestService} from "./services/request.service";
import {ValidatorService} from "./services/validator.service";
import {DataService} from "./services/data.service";
import {AuthGuardService} from "./guards/auth.guard";
import { UsersCardComponent } from './users-card/users-card.component';
import { ProfileComponent } from './profile/profile.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventsComponent } from './events/events.component';

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
    RegisterCardComponent,
    UsersCardComponent,
    ProfileComponent,
    StatsCardComponent,
    NavBarComponent,
    EventsComponent,

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
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [RequestService, ValidatorService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
