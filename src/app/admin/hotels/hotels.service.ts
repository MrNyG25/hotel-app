import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from './interfaces/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

   hotels: Hotel[] = [
    {
      name: "Hotel A",
      city: "City A",
      status: "Active",
      rooms: 50,
      bookings: 20
    },
    {
      name: "Hotel B",
      city: "City B",
      status: "Inactive",
      rooms: 100,
      bookings: 10
    },
    {
      name: "Hotel C",
      city: "City C",
      status: "Active",
      rooms: 75,
      bookings: 30
    }
  ];

  constructor() { }

  getHotels(): Observable<Hotel[]> {
    return of(this.hotels)
  }
}
