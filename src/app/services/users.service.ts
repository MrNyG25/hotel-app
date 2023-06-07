import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'John',
      email: 'admin@gmail.com',
      password: '123qwe'
    }
  ];


  constructor() { }

  isValidUserData(user_email: string, password: string): boolean  {
    return this.users.filter(user => user.email === user_email && user.password === password).length > 0;
  }
}
