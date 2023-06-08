import { RoomType } from "../enums/room-type.enum";

export interface Room {
    id: string;
    room_type: RoomType;
    location: string;
    status: boolean;
    hotel_id: string;
    is_reserved: string;
}