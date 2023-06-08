import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    PrimengModule,
    FormsModule
  ]
})
export class RoomsModule { }
