export interface Gender  {
  id: number;
  name: string;
}
export interface TypeDocument extends Gender {}

export interface Guest {
  name: string;
  lastname: string;
  birth_date: string;
  gender: Gender;
  type_document_id: TypeDocument;
  document_id: number;
  email: string;
  phone_number: number;
}

interface EmergencyContact {
  full_name: string;
  phone_number: number;
}

export interface Booking {
  id: string;
  guests: Guest[];
  emergency_contact: EmergencyContact;
  check_in_date: string;
  check_out_data: string;
  room_id: string;
}
