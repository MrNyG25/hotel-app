import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking.interface';
import { Observable, of } from 'rxjs';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  bookings: Booking[] = [
    {
      guests_info:[
        {
          name: "Jose",
          lastname: "Correa",
          birth_date: "2011-11-03",
          gender: "Male",
          type_document_id: "CC",
          document_id: 123123,
          email: "jj@gmail.com",
          phone_number: 1231232,
          is_guest_who_make_booking: true
        },
        {
          name: "Jose",
          lastname: "Correa",
          birth_date: "2011-11-03",
          gender: "Male",
          type_document_id: "CC",
          document_id: 123123,
          email: "jj@gmail.com",
          phone_number: 1231232,
          is_guest_who_make_booking: false
        },
      ],
      emergency_contact:{
        name: "Jose",
        lastname: "Correa",
        phone_number: 1231232
      },
      room_id: "312312312"
    }
  ]
  
  constructor() { }

  getBookingsByRoomId(room_id: string): Observable<Booking[]>{
    let booking = this.bookings.filter(booking => booking.room_id === room_id);
    return of(booking);
  }
}
