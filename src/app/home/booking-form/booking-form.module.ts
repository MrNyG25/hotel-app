import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingFormRoutingModule } from './booking-form-routing.module';
import { BookingFormComponent } from './booking-form.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';


@NgModule({
  declarations: [
    BookingFormComponent
  ],
  imports: [
    CommonModule,
    BookingFormRoutingModule,
    PrimengModule
  ]
})
export class BookingFormModule { }
