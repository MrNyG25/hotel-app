import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingFormService {

  document_types = [
    {id: 1, name: 'Cedula de ciudadanía'},
    {id: 2, name: 'Tarjeta de identidad'},
    {id: 3, name: 'Pasaporte'},
  ];

  constructor() { }
}
