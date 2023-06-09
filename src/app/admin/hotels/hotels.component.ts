import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from './interfaces/hotel.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HotelFormComponent } from './hotel-form/hotel-form.component';

interface Customer {}

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [MessageService, ConfirmationService,DialogService],
})
export class HotelsComponent implements OnInit ,OnDestroy{
  refHotelFormModal: DynamicDialogRef = new DynamicDialogRef;

  hotels: Customer[] = [];

  first = 0;

  rows = 10;

  constructor(
    private hotelsService: HotelsService,
    public dialogService: DialogService,) {}

  ngOnInit() {
    this.getHotels();
  }


  getHotels(): void{
    this.hotelsService
      .getHotels()
      .subscribe((hotels: Hotel[]) => (this.hotels = hotels));
  }

  onChangeHotelStatus(hotel_id: string){
    this.hotelsService.toggleHotelStatus(hotel_id);
  }

  onShowRoomFormModal(data_to_patch: any = null): void {
    this.refHotelFormModal = this.dialogService.open(HotelFormComponent, {
        header: 'Hotel',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          data_to_patch
        }
    });

    this.refHotelFormModal.onClose.subscribe(() => {
      this.getHotels();
    });

  }

  ngOnDestroy(): void {
    if (this.refHotelFormModal) {
        this.refHotelFormModal.close();
    }
  }
}
