import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingsService } from 'src/app/services/bookings.service';


@Component({
  selector: 'app-room-bookings',
  templateUrl: './room-bookings.component.html',
  styleUrls: ['./room-bookings.component.scss']
})
export class RoomBookingsComponent implements OnInit   {
  
  room_id: string = '';

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
  ){
    const data = config.data;
    this.room_id = data.room_id;
  }
  ngOnInit(): void {
  }

}
