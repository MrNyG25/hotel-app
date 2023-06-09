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
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

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


  document_types: any[] = [];

  genders: any[] = [];

  selected_room: Room | null = null;

  constructor(
    private bookingsService: BookingsService,
    private roomsService: RoomsService,
    private activatedRoute: ActivatedRoute,
    public globalService : GlobalService,
    private messageService: MessageService
    ) {}

  async ngOnInit() {
      await this.getRooms();
      this.checking_date.valueChanges.subscribe(value => {
        this.checkout_date_range.patchValue({start: value})
      })
      this.document_types = this.bookingsService.document_types;
      this.genders = this.bookingsService.genders;
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
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      phone_number: new FormControl('', [Validators.required]),
    });
    
    this.guests.push(guest);
  }

  removeItem(index: number): void {
    this.guests.removeAt(index);
  }

  async getRooms(){
    let bookings: any = await this.bookingsService.getBookings().toPromise();
  
    this.activatedRoute.queryParams.subscribe(params => {
      this.roomsService.getRoomsByHotelId(params?.hotel).pipe(
        map((rooms: Room[]) => rooms.filter(room => room.status === true)),
        map((rooms: Room[]) => rooms.filter((room) =>{ 
          if(!bookings.map((booking: Booking) => booking.room_id).includes(room.id)){
            return room;
          }
        }))
      ).subscribe(rooms => this.rooms = rooms)
    })
  }

  onSubmit(): void {
    let bookingFormData = this.bookingForm.value;

    //Custom validations
    if(bookingFormData?.guests?.length == 0){
      this.showToastError("Se debe ingresar la información de por lo menos de un Huésped")
      return;
    }

    let selectedRoom = this.rooms.filter(room => room.status_choose === true);
    if(selectedRoom.length == 0){
      this.showToastError("Se debe seleccionar por lo menos una habitación")
      return;
    }

    if(this.checkout_date_range.invalid){
      this.showToastError("Se debe seleccionar las fechas de entrada y salida")
      return;
    }

    let rangeDates = this.checkout_date_range.value;
    console.log(bookingFormData)
    console.log(rangeDates)
    console.log(selectedRoom[0])

    let guests: any = bookingFormData.guests?.map((guest: any) => {
      guest.birth_date = moment(guest.birth_date).format('YYYY-MM-DD');
      return guest;
    });

   
    if(this.bookingForm.valid){

      let room_id = selectedRoom[0].id;

      let dataToSave = {
        guests: guests,
        emergency_contact:bookingFormData.emergency_contact,
        check_in_date:  moment(rangeDates.start).format('YYYY-MM-DD'),
        check_out_data: moment(rangeDates.end).format('YYYY-MM-DD'),
        room_id
      }

      this.rooms = this.rooms.filter(room => room.id !== room_id)

      this.bookingsService.saveBooking(dataToSave);
      this.showToastSuccess("Se realizado una reserva, por favor verifica tu correo electrónico")
      this.bookingForm.reset();
      this.checkout_date_range.reset();
      this.guests.reset();
      this.checking_date.reset();
      this.checkout_date_range.reset();
      this.selected_room = null;
    }else{
      this.bookingForm.markAllAsTouched();
      this.checkout_date_range.markAllAsTouched();
    }
  }

  onChooseRoom(room_id: string): void{
    this.rooms = this.rooms.map((room) => {
      if(room.id === room_id){
        room.status_choose = true;
        this.selected_room = room;
      }else{
        room.status_choose = false;
      }
      return room;
    })
  }

  showToastError(error_message: string) : void{
    this.messageService.clear();
    this.messageService.add({ key: 'toastError',  severity: 'error', summary: 'Error', detail: error_message });
  }
  showToastSuccess(message: string) : void{
    this.messageService.clear();
    this.messageService.add({ key: 'toastSuccess',  severity: 'success', summary: 'Éxito', detail: message });
  }
}
