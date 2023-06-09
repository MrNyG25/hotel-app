import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/interfaces/booking.interface';
import { Room } from 'src/app/interfaces/room.interface';
import { BookingsService } from 'src/app/services/bookings.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { map } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GlobalService } from 'src/app/services/global.service';
import { BookingFormService } from './booking-form.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    MessageService
  ]
})
export class BookingFormComponent implements OnInit{

  rooms: Room[] = [];
  
  checking_date = new FormControl(null,[Validators.required]);

  checkout_date_range = new FormGroup({
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
  });
  
  bookingForm = new FormGroup({
    //room_type: new FormControl('', [Validators.required]),
    guests: new FormArray([]),
    emergency_contact: new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
    })
  } ,{ updateOn: 'submit' });

  minDate = new Date()


  document_types: any[] = []

  genders: any[] = [
    {id: 1, name :'Masculino'}, 
    {id: 2, name :'Femenino'}
  ]

  constructor(
    private bookingsService: BookingsService,
    private roomsService: RoomsService,
    private activatedRoute: ActivatedRoute,
    public globalService : GlobalService,
    private bookingFormService: BookingFormService,
    private messageService: MessageService
    ) {}

  ngOnInit() {
      this.getRooms();
      this.checking_date.valueChanges.subscribe(value => {
        this.checkout_date_range.patchValue({start: value})
      })
      this.document_types = this.bookingFormService.document_types;
  }

  get guests(): FormArray {
    return this.bookingForm.get('guests') as FormArray;
  }

  get fullName(): FormControl {
    return this.bookingForm.get('emergency_contact.full_name') as FormControl;
  }

  get phone_number(): FormControl {
    return this.bookingForm.get('emergency_contact.phone_number') as FormControl;
  }

  addItem(): void {
    const guest =  new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      type_document_id: new FormControl('', [Validators.required]),
      document_id: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
    });
    
    this.guests.push(guest);
  }

  removeItem(index: number): void {
    this.guests.removeAt(index);
  }

  getRooms(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.roomsService.getRoomsByHotelId(params?.hotel).pipe(
        map((rooms: Room[]) => rooms.filter(room => room.status === true))
      ).subscribe(rooms => this.rooms = rooms)
    })
  }

  onSubmit(): void {
    let data = this.bookingForm.value;

    //Custom validations
    if(data?.guests?.length == 0){
      this.showToastError("Se debe ingresar la información de por lo menos de un Huésped")
      return;
    }

    let selectedRoom = this.rooms.filter(room => room.status_choose === true);
    if(selectedRoom.length == 0){
      this.showToastError("Se debe seleccionar por lo menos una habitación")
      return;
    }

    console.log(data)
    if(this.bookingForm.valid){
 
    }else{
      this.bookingForm.markAllAsTouched();
      this.checkout_date_range.markAllAsTouched();
    }
  }

  onChooseRoom(room_id: string): void{
    this.rooms = this.rooms.map((room) => {
      if(room.id === room_id){
        room.status_choose = true;
      }else{
        room.status_choose = false;
      }
      return room;
    })
  }

  showToastError(error_message: string) : void{
    /* this.messageService.clear(); */
    this.messageService.add({ key: 'toastError',  severity: 'error', summary: 'Error', detail: error_message });
  }
}
