import { Component, OnDestroy, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces/room.interface';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomBookingsComponent } from './room-bookings/room-bookings.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [DialogService]
})
export class RoomsComponent implements OnInit,OnDestroy  {
  rooms: Room[] = [];
  visibleAddDialog: boolean = false;

  refRoomBookingsModal: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private roomsService: RoomsService,
    private activatedRoute: ActivatedRoute,
    public dialogService: DialogService,){}
  
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

  showAddDialog(): void {
    this.visibleAddDialog = true;
  }

  onAddDialogClose(): void{
    this.getRooms();
  }

  onChangeRoomStatus(room_id: string): void{
    this.roomsService.toggleRoomStatus(room_id);
  }



  onShowRoomBookingsModal(room_id: string): void {
      this.refRoomBookingsModal = this.dialogService.open(RoomBookingsComponent, {
          header: 'Reservas',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
            room_id
          }
      });

  }

  ngOnDestroy(): void {
      if (this.refRoomBookingsModal) {
          this.refRoomBookingsModal.close();
      }
  }
}
