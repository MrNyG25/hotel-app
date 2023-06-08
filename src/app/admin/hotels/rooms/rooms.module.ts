import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomFormComponent } from './room-form/room-form.component';
import { NgxCurrencyModule } from "ngx-currency";
import { RoomBookingsComponent } from './room-bookings/room-bookings.component';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomFormComponent,
    RoomBookingsComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ]
})
export class RoomsModule { }
