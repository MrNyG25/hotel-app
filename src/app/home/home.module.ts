import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { HotelsPublicComponent } from './components/hotels-public/hotels-public.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from '../material-angular/material-angular.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomeNavComponent,
    HotelsPublicComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialAngularModule
  ]
})
export class HomeModule { }
