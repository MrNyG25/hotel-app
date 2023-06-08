import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Hotel } from 'src/app/admin/hotels/interfaces/hotel.interface';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels-public.component.html',
  styleUrls: ['./hotels-public.component.scss']
})
export class HotelsPublicComponent implements OnInit  {
  
  hotels: Hotel[] = [];
  
  selectedCity: any;
  filteredCities: any[] = [];
  cities: any[] = [
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

  guestsQuantityList: any[] = [];

  selectedPeople: any;
  
  constructor(private hotelsService: HotelsService){}

  ngOnInit(): void {
    this.hotelsService.getHotels().pipe(
      map(hotels => hotels.filter(hotel => hotel.status === true))
    ).subscribe((hotels: Hotel[]) => this.hotels = hotels);
    this.fillGuestsQuantitySelect();
  }

  
  filterCity(event: { query: any; }){
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(city);
        }
      }
      
      this.filteredCities = filtered;
      
  }
    
  fillGuestsQuantitySelect(){
    this.guestsQuantityList = [];
    for (let i = 1; i <= 20; i++) {
        this.guestsQuantityList.push({ label: i+' Huéspedes' , value: i });
    }
  }

  guestsListChanged(event: any){
    console.log(event)
  }

}
