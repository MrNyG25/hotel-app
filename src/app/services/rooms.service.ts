import { Injectable } from '@angular/core';
import { RoomType } from '../enums/room-type.enum';
import { Observable, of } from 'rxjs';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  roomTypes: string[] = Object.values(RoomType);

  rooms: Room[] =  [
    {
      id: "312312312",
      room_type: RoomType.Single,
      location: "Salida",
      status: true,
      hotel_id: "1"
    },
    {
      id: "5423432",
      room_type: RoomType.Double,
      location: "Salida",
      status: true,
      hotel_id: "1"
    }
  ]
  
  constructor() { }

  getRoomTypes(): Observable<string[]> {
    return of(this.roomTypes)
  }

  getRoomsByHotelId(hotelId: string): Observable<Room[]>{

    let rooms = this.rooms.filter(room => room.hotel_id === hotelId);

    return of(rooms)
  }
}
