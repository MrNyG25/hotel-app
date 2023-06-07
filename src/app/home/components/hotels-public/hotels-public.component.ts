import { Component } from '@angular/core';

@Component({
  selector: 'app-hotels-public',
  templateUrl: './hotels-public.component.html',
  styleUrls: ['./hotels-public.component.scss']
})
export class HotelsPublicComponent {

  hotels = [
  {
    name: 'Roadway Hotel',
    image: 'https://images.pexels.com/photos/16104977/pexels-photo-16104977/free-photo-of-facade-of-hotel-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 134455

  },
  {
    name: 'Gran Eztanplaza',
    image: 'https://images.pexels.com/photos/10949696/pexels-photo-10949696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 876545

  },
  {
    name: 'Hotel Atlanta',
    image: 'https://images.pexels.com/photos/15374519/pexels-photo-15374519/free-photo-of-umbrellas-in-front-of-concrete-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 312414

  },
  // Add more hotel objects as needed
];
}
