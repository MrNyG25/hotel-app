import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Hotel } from '../admin/hotels/interfaces/hotel.interface';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly localStorageKey = 'hotelsList';

   hotels: Hotel[] = [
    {
      id: "1",
      name: 'Roadway Hotel',
      image: 'https://images.pexels.com/photos/16104977/pexels-photo-16104977/free-photo-of-facade-of-hotel-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      night_price: 134455,
      city: "Medellin",
      status: true,

    },
    {
      id: "2",
      name: 'Gran Eztanplaza',
      image: 'https://images.pexels.com/photos/10949696/pexels-photo-10949696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      night_price: 876545,
      city: "Cali",
      status: false,

    },
    {
      id: "3",
      name: 'Hotel Atlanta',
    image: 'https://images.pexels.com/photos/15374519/pexels-photo-15374519/free-photo-of-umbrellas-in-front-of-concrete-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      night_price: 312414,
      city: "Bogota",
      status: true,

    }
  ];

  constructor(
    private globalService: GlobalService
  ) { }




  getHotels(): Observable<Hotel[]> {
    let hotels = this.globalService.getData(this.localStorageKey, this.hotels);
    return of(hotels);
  }
  
  saveHotel(hotel: Hotel | any): void{
    let hotels = this.globalService.getData(this.localStorageKey, this.hotels);
    
    this.hotels = hotels;

    this.hotels.push({
      ...hotel,
      status: true,
      id: this.globalService.getUUID()
    });
    this.globalService.refreshLocalStorage(this.localStorageKey, this.hotels)
    this.getHotels()
  }
}
