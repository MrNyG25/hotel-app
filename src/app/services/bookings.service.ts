import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking.interface';
import { Observable, of } from 'rxjs';
import { Room } from '../interfaces/room.interface';
import { GlobalService } from './global.service';
import { RoomsService } from './rooms.service';
import * as Email from './smtp';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private readonly localStorageKey = 'bookingsList';

  document_types = [
    {id: 1, name: 'Cedula de ciudadanía'},
    {id: 2, name: 'Tarjeta de identidad'},
    {id: 3, name: 'Pasaporte'},
  ];

  genders = [
    {id: 1, name :'Masculino'}, 
    {id: 2, name :'Femenino'}
  ]

  bookings: Booking[] = [
    {
      id: "3123123",
      guests:[
        {
          name: "Jose",
          lastname: "Correa",
          birth_date: "2011-11-03",
          gender: {id: 1, name :'Masculino'},
          type_document_id: {id: 1, name: 'Cedula de ciudadanía'},
          document_id: 123123,
          email: "jj@gmail.com",
          phone_number: 1231232,
        },
        {
          name: "Jose",
          lastname: "Correa",
          birth_date: "2011-11-03",
          gender: {id: 2, name :'Femenino'},
          type_document_id: {id: 3, name: 'Pasaporte'},
          document_id: 123123,
          email: "jj@gmail.com",
          phone_number: 1231232,
        },
      ],
      emergency_contact:{
        full_name: "Jose Alfonso",
        phone_number: 1231232
      },
      check_in_date: "2011-11-03",
      check_out_data: "2011-11-03",
      room_id: "312312312"
    }
  ]
  
  constructor(
    private globalService: GlobalService,
    private roomsService: RoomsService
  ) { }

  getBookingsByRoomId(room_id: string): Observable<Booking[]>{
    let bookings: Booking[] = this.globalService.getData(this.localStorageKey, this.bookings);

    let roomsFiltered = [...bookings].filter(booking => booking.room_id === room_id);

    return of(roomsFiltered);
  }

  getBookings(): Observable<Booking[]>{
    let bookings: Booking[] = this.globalService.getData(this.localStorageKey, this.bookings);

    this.bookings = bookings;
    

    return of(this.bookings);
  }

  async saveBooking(data: any, room_info: any){

    let bookings: Booking[] = this.globalService.getData(this.localStorageKey, this.bookings);

    this.bookings = bookings;

    this.roomsService.updateIsReservedProperty(data.room_id);

    this.bookings.push({
      ...data,
      id: this.globalService.getUUID(),
    });



    await this.sendEmail('yesid19999@gmail.com', data, room_info)

    this.globalService.refreshLocalStorage(this.localStorageKey, this.bookings)
  }


  async sendEmail(email_to: string, data: any, room_info: any){

    let guest = data.guests[0];

    await Email.send({
      Host : "smtp.elasticemail.com",
      Username : "nygarcia@misena.edu.co",
      Password : "98B3F69E6C2462F46533EC54FCDF35FA065D",
      To : email_to,
      From : `nygarcia46@misena.edu.co`,
      Subject : "HotelApp notificación: Reserva realizada exitosamente",
      Body : `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Notificación de Reserva</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
          }
      
          h1 {
            color: #007BFF;
          }
      
          p {
            margin-bottom: 10px;
          }
      
          .reservation-details {
            background-color: #F5F5F5;
            padding: 20px;
            border-radius: 5px;
          }
      
          .bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Notificación de Reserva</h1>
      
        <div class="reservation-details">
          <p><span class="bold">Estimado/a ${guest.name} ${guest.lastname}</span></p>
      
          <p>Su reserva ha sido confirmada. A continuación, se detallan los datos de la reserva:</p>
      
          <ul>
            <li><span class="bold">Fecha de check-in:</span> ${data.check_in_date}</li>
            <li><span class="bold">Fecha de check-out:</span> ${data.check_out_date}</li>
            <li><span class="bold">Habitación reservada:</span> ${room_info.room_type.name}</li>
            <li><span class="bold">Con cercanía a :</span>  ${room_info.location.name}</li>
            <li><span class="bold">Precio total mas impuestos:</span>COP $ ${room_info.base_price + room_info.taxes}</li>
          </ul>
      
          <p>¡Gracias por elegir nuestro hotel! Esperamos que tenga una estancia agradable.</p>
      
          <p>Atentamente,</p>
          <p>Nombre hotel</p>
        </div>
      </body>
      </html> `
     })
  }

}
