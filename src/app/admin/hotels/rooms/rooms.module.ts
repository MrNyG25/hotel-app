import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomFormComponent } from './room-form/room-form.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    RoomsComponent,
    RoomFormComponent,
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
