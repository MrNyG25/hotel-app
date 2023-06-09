import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  minDate = new Date()

  checking_date = new FormControl();

  checkout_date_range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  
  constructor(private hotelsService: HotelsService){}

  ngOnInit(): void {
    this.checking_date.valueChanges.subscribe(value => {
      this.checkout_date_range.patchValue({start: value})
    })
    
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
    for (let i = 1; i <= 10; i++) {
        this.guestsQuantityList.push({ label: i+' Huéspedes' , value: i });
    }
  }

  guestsListChanged(event: any){
    console.log(event)
  }

}
