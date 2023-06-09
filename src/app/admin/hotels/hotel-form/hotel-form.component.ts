import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from 'src/app/services/hotels.service';
import { GlobalService } from 'src/app/services/global.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { City } from 'src/app/interfaces/city.interface';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss'],
  providers: [MessageService]
})
export class HotelFormComponent implements OnInit{


  isEditing:boolean = false;
  data_to_patch: any = {};
  cities: City[] =  [];

  hotelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern(/^https.*\.(jpe?g|png)$/)]),
    night_price: new FormControl('', [Validators.required]),
  } ,{ updateOn: 'submit' });

  constructor(
    private hotelsService: HotelsService,
    public globalService: GlobalService,
    public config: DynamicDialogConfig,
    private messageService: MessageService){
    const data = config.data;
    const data_to_patch = data?.data_to_patch;
    if(data_to_patch){
      this.isEditing = true;
      this.data_to_patch = data_to_patch;
      this.hotelForm.patchValue(data_to_patch);
    }
  }
  ngOnInit(): void {
    this.cities = this.hotelsService.cities;
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

      if(this.isEditing){
        this.hotelsService.updateHotel({...this.hotelForm.value, id: this.data_to_patch.id})
        this.showToastSuccess("Hotel actualizado correctamente");
        this.isEditing = false;
      }else{
        this.hotelsService.saveHotel(this.hotelForm.value)
        this.showToastSuccess("Hotel agregado correctamente");
      }
      this.hotelForm.reset();
    }else{
      this.hotelForm.markAllAsTouched();
    }
  }

  showToastSuccess(message: string) : void{
    this.messageService.clear();
    this.messageService.add({ key: 'toastSuccess',  severity: 'success', summary: 'Éxito', detail: message });
  }

  
}
