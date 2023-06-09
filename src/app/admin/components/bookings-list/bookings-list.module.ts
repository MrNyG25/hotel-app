import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { BookingsListComponent } from './bookings-list.component';
import { GuestsListComponent } from './guests-list/guests-list.component';



@NgModule({
  declarations: [
    BookingsListComponent,
    GuestsListComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [BookingsListComponent, GuestsListComponent]
})
export class BookingsListModule { }
