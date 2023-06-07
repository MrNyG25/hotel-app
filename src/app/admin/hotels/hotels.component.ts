import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class HotelsComponent {

}
