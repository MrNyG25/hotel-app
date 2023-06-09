import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomLocationI } from 'src/app/interfaces/room-location.interface';
import { RoomTypeI } from 'src/app/interfaces/room-type.interface';
import { GlobalService } from 'src/app/services/global.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
  providers: [MessageService]
})
export class RoomFormComponent implements OnInit{

  roomTypes: RoomTypeI[] = [];
  roomLocations: RoomLocationI[] = [];
  hotel_id: string = '';

  isEditing:boolean = false;
  data_to_patch: any = {};

  roomForm = new FormGroup({
    room_type: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    base_price: new FormControl('', [Validators.required]),
    taxes: new FormControl('', [Validators.required]),
  } ,{ updateOn: 'submit' });

  constructor(
    private roomsService: RoomsService,
    public globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    public config: DynamicDialogConfig,
    private messageService: MessageService
    ){
      const data = config.data;
      const data_to_patch = data?.data_to_patch;
      if(data_to_patch){
        this.isEditing = true;
        this.data_to_patch = data_to_patch;
        this.roomForm.patchValue(data_to_patch);
      }

  }
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      let hotel_id = params?.hotel
      this.hotel_id = hotel_id;
    })
    
    this.getRoomTypes();
    this.getRoomLocations();
  }

  get room_type(): FormControl {
    return this.roomForm.get('room_type') as FormControl;
  }
  
  get location(): FormControl {
    return this.roomForm.get('location') as FormControl;
  }
  
  get base_price(): FormControl {
    return this.roomForm.get('base_price') as FormControl;
  }
  
  get taxes(): FormControl {
    return this.roomForm.get('taxes') as FormControl;
  }

  getRoomTypes(): void{
    this.roomsService.getRoomTypes().subscribe(roomTypes => this.roomTypes = roomTypes);
  }

  getRoomLocations(): void{
    this.roomsService.getRoomLocations().subscribe(roomLocations => this.roomLocations = roomLocations);
  }

  onSubmit(){
    if(this.roomForm.valid){
      console.log(this.roomForm.value);

      if(this.isEditing){
        this.roomsService.updateRoom({...this.roomForm.value, id: this.data_to_patch.id})
        this.showToastSuccess("Habitación actualizado correctamente");
        this.isEditing = false;
      }else{
        this.roomsService.saveRoom({
          ...this.roomForm.value,
          hotel_id: this.hotel_id
        });
        this.showToastSuccess("Habitación agregado correctamente");
      }
      
      this.roomForm.reset();
    }else{
      this.roomForm.markAllAsTouched();
    }
  }

  showToastSuccess(message: string) : void{
    this.messageService.clear();
    this.messageService.add({ key: 'toastSuccess',  severity: 'success', summary: 'Éxito', detail: message });
  }

}
