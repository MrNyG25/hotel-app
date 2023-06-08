import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingFormRoutingModule } from './booking-form-routing.module';
import { BookingFormComponent } from './booking-form.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingFormComponent
  ],
  imports: [
    CommonModule,
    BookingFormRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookingFormModule { }
