import { Injectable } from '@angular/core';
import { Guest } from '../interfaces/guest.interface';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  guests: Guest[] = [
    {
      id: 1,
      name: 'Pedro',
      lastName: 'Pedro',
      email: 'guest1@gmail.com',
      password: '123qwe'
    }
  ];


  constructor() { }

  exitsGuest(user_email: string) {
    return this.guests.filter(user => user.email === user_email).length > 0;
  }
}
