import { Component, Input } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Booking, Guest } from 'src/app/interfaces/booking.interface';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GuestsListComponent } from './guests-list/guests-list.component';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class BookingsListComponent {
  roomBookings: Booking[] = [];

  @Input() room_id: string = '';

  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private bookingsService: BookingsService,
    public dialogService: DialogService,){}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void{
    if(this.room_id){
      this.bookingsService.getBookingsByRoomId(this.room_id).subscribe(bookings => {
        this.roomBookings = bookings;
      })
      return;
    }
    this.bookingsService.getBookings().subscribe(bookings => {
      this.roomBookings = bookings;
    })
  }

  onShowGuestModal(guests: Guest[]): void{
    this.ref = this.dialogService.open(GuestsListComponent, {
      header: 'Huéspedes',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        guests: guests
      }
  });
  }
}
