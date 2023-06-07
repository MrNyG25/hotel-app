interface GuestInfo {
  name: string;
  lastname: string;
  birth_date: string;
  gender: string;
  type_document_id: string;
  document_id: number;
  email: string;
  phone_number: number;
  is_guest_who_make_booking: boolean;
}

interface EmergencyContact {
  name: string;
  lastname: string;
  phone_number: number;
}

export interface Booking {
  guests_info: GuestInfo[];
  emergency_contact: EmergencyContact;
  room_id: string;
}
