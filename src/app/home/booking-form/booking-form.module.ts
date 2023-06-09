import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingFormRoutingModule } from './booking-form-routing.module';
import { BookingFormComponent } from './booking-form.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';


@NgModule({
  declarations: [
    BookingFormComponent
  ],
  imports: [
    CommonModule,
    BookingFormRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAngularModule
  ]
})
export class BookingFormModule { }
