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
  guest_id?: string;
}

/**
 * * SESSIONS
 */
export interface RecurringOptions {
  room_id: string;
  name?: string;
  weekdays: string[];
  practitioner_id?: string;
  start_time: string;
  capacity: number;
  recurrence_start?: string;
  recurrence_end?: string;
}

export interface SessionQuery {
  basket_id?: string;
  guest_id?: string;
  quantity?: string;
  date_from?: string;
  date_to?: string;
  date_time_from?: string;
  date_time_to?: string;
}

/**
 * *MEMBERSHIPS
 */
export interface MembershipTypeResponse {
  data: MembershipType[];
  meta: Meta;
}

export interface MembershipType {
  id: string;
  name: string;
  description: string;
  terms: string;
  brand_id: string;
  offline_payments: boolean;
  disable_confirmation_email: boolean;
  private: boolean;
  minimum_start_date: string;
  min_members: number;
  max_members: number;
  rates: Rate[];
  revenue_schedule: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface MembershipRateResponse {
  data: MembershipRateData[];
  meta: Meta;
}

export interface MembershipRateData {
  id: string;
  membership_type_id: string;
  name: string;
  currency: string;
  price: number;
  joining_fee: number;
  tax: number;
  billing_frequency: string;
  processors: string[];
  default_duration: string;
  private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  from: number;
  to: number;
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
  path: string;
}

export interface Rate {
  id: string;
  membership_type_id: string;
  name: string;
  currency: string;
  price: number;
  joining_fee: number;
  tax: number;
  billing_frequency: string;
  processors: string[];
  default_duration: string;
  private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  from: number;
  to: number;
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
  path: string;
}

export interface CreateMembershipBody {
  customer_id: string;
  membership_type_id: string;
  membership_rate_id: string;
  start_date?: string;
  end_date?: string;
}

export interface MembershipQuery {
  brand_id?: string;
  archived?: boolean;
  public?: boolean;
  auto_payments?: boolean;
  terms?: boolean;
  per_page?: number;
  page?: number;
}

export interface CreateMemberResponse {
  id: string;
  site_id: string;
  membership_number: string;
  customer: Customer;
  members: Member[];
  type: MembershipType;
  rate: Rate;
  status: string;
  source: string;
  payment_method: PaymentMethod;
  start_date: string;
  end_date: string;
  created_at: string;
  basket_id: string;
  external_ref: string;
  next_billing_date: string;
  attention_reason: string;
}

export interface Member {
  customer_id: string;
  membership_number: string;
  is_lead: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last_4: string;
  status: string;
  card_brand: string;
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
