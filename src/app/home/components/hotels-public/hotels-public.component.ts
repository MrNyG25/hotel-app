import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/admin/hotels/interfaces/hotel.interface';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels-public.component.html',
  styleUrls: ['./hotels-public.component.scss']
})
export class HotelsPublicComponent implements OnInit  {
  peopleQuantityList: any[] = [];

  selectedPeople: any;

  hotels: Hotel[] = [];

  selectedCountry: any;
  filteredCountries: any[] = [];
  countries: any[] = [
    {name: 'Cali'},
    {name: 'Bogotá'},
    {name: 'Medellín'},
  ];

  constructor(private hotelsService: HotelsService){}

  ngOnInit(): void {
    this.hotelsService.getHotels().subscribe((hotels: Hotel[]) => this.hotels = hotels);
    this.fillPeopleQuantitySelect();
  }

  fillPeopleQuantitySelect(){
    this.peopleQuantityList = [];
    for (let i = 1; i <= 20; i++) {
        this.peopleQuantityList.push({ label: i+' Huéspedes' , value: i });
    }
  }

  filterCountry(event: { query: any; }){
    let query = event.query;
    console.log(query);
    this.filteredCountries = [...this.countries];
  }

  peopleQuantityListChanged(event: any){
    console.log(event)
  }

}
