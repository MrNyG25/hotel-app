import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Hotel } from '../admin/hotels/interfaces/hotel.interface';
import { GlobalService } from './global.service';
import { City } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly localStorageKey = 'hotelsList';

  cities: City[] =  [
    {
      id:1,
      name: 'Cali',
    },
    {
      id:2,
      name: 'Bogotá',
    },
    {
      id:3,
      name: 'Medellín',
    },
  ];

   hotels: Hotel[] = [
    {
      id: "1",
      name: 'Roadway Hotel',
      image: 'https://images.pexels.com/photos/16104977/pexels-photo-16104977/free-photo-of-facade-of-hotel-in-city.jpeg',
      night_price: 134455,
      city:{
        id:1,
        name: 'Cali',
      },
      status: true,

    },
    {
      id: "2",
      name: 'Gran Eztanplaza',
      image: 'https://images.pexels.com/photos/10949696/pexels-photo-10949696.jpeg',
      night_price: 876545,
      city: {
        id:2,
        name: 'Bogotá',
      },
      status: true,

    },
    {
      id: "3",
      name: 'Hotel Atlanta',
    image: 'https://images.pexels.com/photos/15374519/pexels-photo-15374519/free-photo-of-umbrellas-in-front-of-concrete-building.jpeg',
      night_price: 312414,
      city: {
        id:3,
        name: 'Medellín',
      },
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

  updateHotel(hotel_param: Hotel | any): void{
   
    let hotels = this.globalService.getData(this.localStorageKey, this.hotels);
    
    this.hotels = hotels;

    this.hotels = this.hotels.map((hotel) => {
      if(hotel.id === hotel_param.id){
        hotel = {...hotel, ...hotel_param, }
      }
      return hotel;
    })
    this.globalService.refreshLocalStorage(this.localStorageKey, this.hotels)
    this.getHotels()
  }


  toggleHotelStatus(hotel_id: string): void{
    let hotels: Hotel[] = this.globalService.getData(this.localStorageKey, this.hotels);
    let hotelRes = hotels.map((hotel) => {
      if(hotel.id === hotel_id){
        hotel.status = !hotel.status
      }
      return hotel;
    })
    this.globalService.refreshLocalStorage(this.localStorageKey, hotelRes);
  }
}
