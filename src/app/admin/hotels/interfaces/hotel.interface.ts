import { City } from "src/app/interfaces/city.interface";

export interface Hotel {
    id: string;
    name: string;
    image: string;
    night_price: number;
    city: City;
    status: boolean;
}