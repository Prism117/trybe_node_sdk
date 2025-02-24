export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Fetcher = (
  endpoint: string,
  options?: { params?: any; body?: any; method?: Method }
) => Promise<any>;

interface Guest {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  is_lead_booker?: boolean;
  intake_form_submission_id?: string;
  intake_form_complete?: boolean;
  intake_form_submitted_at?: string;
}
export interface BasketItem {
  offering_type: "appointment" | "session" | "package" | "product";
  offering_id: string;
  date?: string;
  time?: string;
  duration?: number;
  quantity?: number;
  guests?: Guest[];
  item_configuration?: any;
}
export interface OrderItem extends BasketItem {
  practitioner_ids?: string[];
  room_id?: string;
  guest_ids?: string[];
}

//* Avilability
type IsoOffsetStr = string;

export interface AllOfferingsResponse {
  data: [
    {
      date: string;
      has_availability: boolean;
      can_enquire: boolean;
      bookable_from: IsoOffsetStr;
      bookable_to: IsoOffsetStr;
    }
  ];
  meta: {
    max_advance_bookings_interval: string;
    min_advance_bookings_interval: string;
  };
}
