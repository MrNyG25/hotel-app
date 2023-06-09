import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../interfaces/room.interface';
import { GlobalService } from './global.service';
import { RoomTypeI } from '../interfaces/room-type.interface';
import { RoomLocationI } from '../interfaces/room-location.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private readonly localStorageKey = 'roomsList';

  roomTypes: RoomTypeI[] = [
    { id: 1, name: "1 cama individual", max_guests_capacity: 1 },
    { id: 2, name: "2 camas dobles", max_guests_capacity: 4 },
    { id: 3, name: "1 cama doble, 2 camas individuales", max_guests_capacity: 4 },
    { id: 4, name: "2 camas individuales", max_guests_capacity: 2 },
    { id: 5, name: "1 cama queen", max_guests_capacity: 2 },
    { id: 6, name: "1 cama king", max_guests_capacity: 2 },
    { id: 7, name: "4 camas dobles", max_guests_capacity: 8 }
  ]
;
  roomLocations: RoomLocationI[] = [
    { id: 1, name: "Cerca a la sala de estar" },
    { id: 2, name: "Cerca a la cocina" },
    { id: 5, name: "Cerca a la salida" },
    { id: 6, name: "Cerca al patio delantero" },
    { id: 7, name: "Cerca al patio trasero" },
    { id: 8, name: "Cerca al garaje" },
    { id: 9, name: "Cerca al comedor" }
  ];

  rooms: Room[] =  [
    {
      id: "312312312",
      room_type:{ id: 1, name: "1 cama individual", max_guests_capacity: 1 },
      location: { id: 1, name: "Cerca a la sala de estar" },
      status: true,
      is_reserved: true,
      base_price: 42342,
      taxes: 33,
      hotel_id: "1"
    },
    {
      id: "5423432",
      room_type: { id: 6, name: "1 cama king", max_guests_capacity: 2 },
      location:  { id: 6, name: "Cerca al patio delantero" },
      status: true,
      is_reserved: false,
      base_price: 42342,
      taxes: 222,
      hotel_id: "1"
    }
  ]
  
  constructor(
    private globalService: GlobalService
  ) { }

  getRoomTypes(): Observable<RoomTypeI[]> {
    return of(this.roomTypes)
  }

  getRoomLocations(): Observable<RoomLocationI[]> {
    return of(this.roomLocations)
  }

  getRoomsByHotelId(hotelId: string): Observable<Room[]>{
    let rooms: Room[] = this.globalService.getData(this.localStorageKey, this.rooms);

    let roomsFiltered = [...rooms].filter(room => room.hotel_id === hotelId);

    return of(roomsFiltered)
  }


  saveRoom(room: Room | any): void{
    let rooms: Room[] = this.globalService.getData(this.localStorageKey, this.rooms);

    this.rooms = rooms;

    this.rooms.push({
      ...room,
      status: true,
      id: this.globalService.getUUID(),
      is_reserved: false,
    });

    this.globalService.refreshLocalStorage(this.localStorageKey, this.rooms)
    this.getRoomsByHotelId(room.hotel_id)
  }

  toggleRoomStatus(room_id: string): void{
    let rooms: Room[] = this.globalService.getData(this.localStorageKey, this.rooms);
    let roomsRes = rooms.map((room) => {
      if(room.id === room_id){
        room.status = !room.status
      }
      return room;
    })
    this.globalService.refreshLocalStorage(this.localStorageKey, roomsRes);
  }
  
}
