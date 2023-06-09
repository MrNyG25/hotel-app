import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/interfaces/booking.interface';
import { Room } from 'src/app/interfaces/room.interface';
import { BookingsService } from 'src/app/services/bookings.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { map } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ]
})
export class BookingFormComponent implements OnInit{

  rooms: Room[] = [];

  bookingForm = new FormGroup({
    //room_type: new FormControl('', [Validators.required]),
    guests: new FormArray([]),
    emergency_contact: new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
    })
  } ,{ updateOn: 'submit' });

  minDate = new Date()

  checking_date = new FormControl();

  checkout_date_range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private bookingsService: BookingsService,
    private roomsService: RoomsService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
      this.getRooms();
      this.checking_date.valueChanges.subscribe(value => {
        this.checkout_date_range.patchValue({start: value})
      })
  }

  get guests(): FormArray {
    return this.bookingForm.get('guests') as FormArray;
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
    console.log(this.bookingForm.value)
  }
}
