import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { HotelsPublicComponent } from './components/hotels-public/hotels-public.component';
import { FormsModule } from '@angular/forms';


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
    PrimengModule
  ]
})
export class HomeModule { }
