import { RoomLocationI } from "./room-location.interface";
import { RoomTypeI } from "./room-type.interface";

export interface Room {
    id: string;
    room_type: RoomTypeI;
    location: RoomLocationI;
    status: boolean;
    is_reserved: boolean;
    base_price: number;
    taxes: number;
    hotel_id: string;
    status_choose?: boolean;
}