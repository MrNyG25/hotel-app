import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces/room.interface';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit  {
  rooms: Room[] = [];
  visibleAddDialog: boolean = false;

  constructor(
    private roomsService: RoomsService,
    private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void{
    this.activatedRoute.queryParams.subscribe(params => {
      this.roomsService.getRoomsByHotelId(params?.hotel).subscribe(rooms => {
        this.rooms = rooms;
      })
    })
  }

  showAddDialog() {
    this.visibleAddDialog = true;
  }

  onAddDialogClose(){
    this.getRooms();
  }

  onChangeRoomStatus(room_id: string){
    this.roomsService.toggleRoomStatus(room_id);
  }
}
