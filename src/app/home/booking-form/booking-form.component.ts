import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/interfaces/booking.interface';
import { Room } from 'src/app/interfaces/room.interface';
import { BookingsService } from 'src/app/services/bookings.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit{

  rooms: Room[] = [];

  constructor(
    private bookingsService: BookingsService,
    private roomsService: RoomsService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
      this.getBookings();
  }

  getBookings(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.roomsService.getRoomsByHotelId(params?.hotel).subscribe(rooms => this.rooms = rooms)
    })
  }

}
