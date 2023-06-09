import { Component, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Guest } from 'src/app/interfaces/booking.interface';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss']
})
export class GuestsListComponent {

  @Input() guests: Guest | any = [];

  constructor(public config: DynamicDialogConfig,){
    const data = config.data;
    this.guests = data.guests;
  }
}
