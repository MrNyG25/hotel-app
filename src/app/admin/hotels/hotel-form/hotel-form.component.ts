import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from 'src/app/services/hotels.service';
import { Hotel } from '../interfaces/hotel.interface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent {


  hotelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern(/^https.*\.(jpe?g|png)$/)]),
    night_price: new FormControl('', [Validators.required]),
  } ,{ updateOn: 'submit' });

  constructor(
    private hotelsService: HotelsService,
    public globalService: GlobalService){

  }
  get name(): FormControl {
    return this.hotelForm.get('name') as FormControl;
  }
  
  get city(): FormControl {
    return this.hotelForm.get('city') as FormControl;
  }
  
  get image(): FormControl {
    return this.hotelForm.get('image') as FormControl;
  }
  
  get night_price(): FormControl {
    return this.hotelForm.get('night_price') as FormControl;
  }

  onSubmit(){
    if(this.hotelForm.valid){
      console.log(this.hotelForm.value);
      this.hotelsService.saveHotel(this.hotelForm.value)
      this.hotelForm.reset();
    }else{
      this.hotelForm.markAllAsTouched();
    }
  }

  
}
