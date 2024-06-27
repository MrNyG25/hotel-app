import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { Hotel } from 'src/app/admin/hotels/interfaces/hotel.interface';
import { HotelsService } from 'src/app/services/hotels.service';
import * as moment from 'moment';

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels-public.component.html',
  styleUrls: ['./hotels-public.component.scss']
})
export class HotelsPublicComponent implements OnInit  {
  
  hotels: Hotel[] = [];
  temp_hotels: Hotel[] = [];
  
  filteredCities: any[] = [];
  cities: any[] = [];

  guestsQuantityList: any[] = [];

  
  minDate = new Date()
  
  checking_date = new FormControl();
  
  checkout_date_range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  cityFControl =  new FormControl();
  guestsQuantityFControl =  new FormControl();

  selectedPeople: any;

  
  constructor(private hotelsService: HotelsService){}

  ngOnInit(): void {
    this.cities = this.hotelsService.cities;
    this.checking_date.valueChanges.subscribe(value => {
      this.checkout_date_range.patchValue({start: value})
    })

    this.getHotels()
    
    this.fillGuestsQuantitySelect();
    this.subscribeFilters();
  }

  getHotels(){
    this.hotelsService.getHotels().pipe(
      map(hotels => hotels.filter(hotel => hotel.status === true))
    ).subscribe((hotels: Hotel[]) => {
      this.temp_hotels = [...hotels];

      this.hotels = hotels;
    });
  }

  
  filterCity(event: { query: any; }){
    let filtered: any[] = [...this.cities];
  
    filtered.push({
      id: "all",
      name: "Todas"
    })

    this.filteredCities = filtered;
      
  }
    
  fillGuestsQuantitySelect(){
    this.guestsQuantityList = [];
    for (let i = 1; i <= 10; i++) {
        this.guestsQuantityList.push({ label: i+' Huéspedes' , value: i });
    }
  }

  guestsQuantityListChanged(event: any){
    console.log(event)

    

  }

  subscribeFilters(): void {
    
    this.checkout_date_range.valueChanges.subscribe((value) => {
      let rangeDates = this.checkout_date_range.value;
      
      
      let filterDates = {
        check_in_date:  moment(rangeDates.start).format('YYYY-MM-DD'),
        check_out_data: moment(rangeDates.end).format('YYYY-MM-DD'),
      }
      
      console.log(filterDates)
    })
    
    this.cityFControl.valueChanges.subscribe((city) => {
      const temp =  this.temp_hotels.filter(hotel => hotel.city.id === city.id);
      if(city.id == "all"){
        this.hotels = [...this.temp_hotels];
        return;
      }
      this.hotels = temp;
    });

    this.guestsQuantityFControl.valueChanges.subscribe((value) => {
      console.log(value)
    });
  }

}
