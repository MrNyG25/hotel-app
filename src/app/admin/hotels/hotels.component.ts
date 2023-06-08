import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from './interfaces/hotel.interface';

interface Customer {}

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class HotelsComponent implements OnInit {
  visibleAddDialog: boolean = false;

  hotels: Customer[] = [];

  first = 0;

  rows = 10;

  constructor(private hotelsService: HotelsService) {}

  ngOnInit() {
    this.getHotels();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.hotels ? this.first === this.hotels.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.hotels ? this.first === 0 : true;
  }

  getHotels(): void{
    this.hotelsService
      .getHotels()
      .subscribe((hotels: Hotel[]) => (this.hotels = hotels));
  }

  onChangeHotelStatus(hotel_id: string){
    this.hotelsService.toggleHotelStatus(hotel_id);
  }

  showAddDialog() {
    this.visibleAddDialog = true;
  }

  onAddDialogClose(){
    this.getHotels();
  }
}
