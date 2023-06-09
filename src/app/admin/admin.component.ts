import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Administrar Hoteles',
                icon: 'pi pi-pw pi-building',
                items: [
                  {
                      label: 'Hoteles', 
                      icon: 'pi pi-server',
                      routerLink: 'hotels'
                  },
                  {
                      label: 'Reservas', 
                      icon: 'pi pi-book',
                      routerLink: 'bookings'
                  }

                ]
            },
        ];
    }

}
