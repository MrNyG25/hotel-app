import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelFormComponent } from './hotel-form/hotel-form.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    HotelsComponent,
    HotelFormComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ]
})
export class HotelsModule { }
