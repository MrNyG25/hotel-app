import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from '../admin/hotels/interfaces/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

   hotels: Hotel[] = [
    {
      id: "1",
      name: 'Roadway Hotel',
      image: 'https://images.pexels.com/photos/16104977/pexels-photo-16104977/free-photo-of-facade-of-hotel-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      night_price: 134455,
      city: "Medellin",
      status: true,
      rooms: 50,
      bookings: 20
    },
    {
      id: "2",
      name: 'Gran Eztanplaza',
      image: 'https://images.pexels.com/photos/10949696/pexels-photo-10949696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      night_price: 876545,
      city: "Cali",
      status: false,
      rooms: 100,
      bookings: 10
    },
    {
      id: "3",
      name: 'Hotel Atlanta',
    image: 'https://images.pexels.com/photos/15374519/pexels-photo-15374519/free-photo-of-umbrellas-in-front-of-concrete-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      night_price: 312414,
      city: "Bogota",
      status: true,
      rooms: 75,
      bookings: 30
    }
  ];

  constructor() { }

  getHotels(): Observable<Hotel[]> {
    return of(this.hotels)
  }
}
