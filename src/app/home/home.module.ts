import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { HotelsComponent } from './components/hotels/hotels.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeNavComponent,
    HotelsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule
  ]
})
export class HomeModule { }
