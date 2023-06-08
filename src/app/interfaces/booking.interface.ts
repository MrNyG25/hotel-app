interface Guest {
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
  full_name: string;
  phone_number: number;
}

export interface Booking {
  guests: Guest[];
  emergency_contact: EmergencyContact;
  check_in_date: string;
  check_out_data: string;
  room_id: string;
}
