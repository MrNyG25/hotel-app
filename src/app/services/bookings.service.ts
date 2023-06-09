import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking.interface';
import { Observable, of } from 'rxjs';
import { Room } from '../interfaces/room.interface';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private readonly localStorageKey = 'bookingsList';

  document_types = [
    {id: 1, name: 'Cedula de ciudadanía'},
    {id: 2, name: 'Tarjeta de identidad'},
    {id: 3, name: 'Pasaporte'},
  ];

  genders = [
    {id: 1, name :'Masculino'}, 
    {id: 2, name :'Femenino'}
  ]

  bookings: Booking[] = [
    {
      id: "3123123",
      guests:[
        {
          name: "Jose",
          lastname: "Correa",
          birth_date: "2011-11-03",
          gender: {id: 1, name :'Masculino'},
          type_document_id: {id: 1, name: 'Cedula de ciudadanía'},
          document_id: 123123,
          email: "jj@gmail.com",
          phone_number: 1231232,
        },
        {
          name: "Jose",
          lastname: "Correa",
          birth_date: "2011-11-03",
          gender: {id: 2, name :'Femenino'},
          type_document_id: {id: 3, name: 'Pasaporte'},
          document_id: 123123,
          email: "jj@gmail.com",
          phone_number: 1231232,
        },
      ],
      emergency_contact:{
        full_name: "Jose Alfonso",
        phone_number: 1231232
      },
      check_in_date: "2011-11-03",
      check_out_data: "2011-11-03",
      room_id: "312312312"
    }
  ]
  
  constructor(
    private globalService: GlobalService
  ) { }

  getBookingsByRoomId(room_id: string): Observable<Booking[]>{
    let booking = this.bookings.filter(booking => booking.room_id === room_id);
    return of(booking);
  }

  getBookings(): Observable<Booking[]>{
    let bookings: Booking[] = this.globalService.getData(this.localStorageKey, this.bookings);

    this.bookings = bookings;

    return of(this.bookings);
  }

  saveBooking(data: any){
    let bookings: Booking[] = this.globalService.getData(this.localStorageKey, this.bookings);

    this.bookings = bookings;

    this.bookings.push({
      ...data,
      id: this.globalService.getUUID(),
    });

    this.globalService.refreshLocalStorage(this.localStorageKey, this.bookings)
  }
}
