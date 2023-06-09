import { Component, OnDestroy, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces/room.interface';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomBookingsComponent } from './room-bookings/room-bookings.component';
import { RoomFormComponent } from './room-form/room-form.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [DialogService]
})
export class RoomsComponent implements OnInit,OnDestroy  {
  rooms: Room[] = [];

  refRoomBookingsModal: DynamicDialogRef = new DynamicDialogRef;
  refRoomFormModal: DynamicDialogRef = new DynamicDialogRef;

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

  onShowRoomFormModal(data_to_patch: any = null): void {
    this.refRoomFormModal = this.dialogService.open(RoomFormComponent, {
        header: 'Habitación',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          data_to_patch
        }
    });

    this.refRoomFormModal.onClose.subscribe(() => {
      this.getRooms();
    });

  }


  ngOnDestroy(): void {
      if (this.refRoomBookingsModal) {
          this.refRoomBookingsModal.close();
      }
      if (this.refRoomFormModal) {
          this.refRoomFormModal.close();
      }
  }
}
