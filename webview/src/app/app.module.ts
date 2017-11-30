import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router"

import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatSelectModule, MatSlideToggleModule,
  MatToolbarModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCardComponent } from './register-card/register-card.component';
import { CreateCommunityComponent } from './create-community/create-community.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RequestService} from "./services/request.service";
import {ValidatorService} from "./services/validator.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  // {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    RegisterCardComponent,
    CreateCommunityComponent,
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
  providers: [RequestService, ValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
