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
  guests: Guest[];
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
 * * CUSTOMERS
 */

export interface CustomerQuery {
  per_page?: number;
  page?: number;
  query?: string;
  email?: string;
  organisation_id?: string;
  brand_id?: string;
  site_id?: string;
  membership_number?: string;
  name?: string;
  phone?: string;
  membership?: "none" | "any" | "needs_dd_mandate";
  membership_created_at_from?: string;
  membership_created_at_to?: string;
  membership_type_id?: string;
  memebership_rate_id?: string;
  marketing_opt_in?: string;
  label_ids?: string;
  id?: string;
  created_at_from?: string;
  created_at_to?: string;
  updated_at_from?: string;
  updated_to_from?: string;
}

export interface CustomerResponse {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  has_password: boolean;
  dob: string;
  brand_id: string;
  site_id: string;
  stripe_id: string;
  express_stripe_id: string;
  email: string;
  labels: Label[];
  preferred_locale: string;
  locked_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  last_active_at: string;
  email_verified_at: string;
  last_check_in: LastCheckIn;
  avatar_id: string;
  avatar: Avatar;
  external_ref: string;
}

interface Label {
  id: string;
  value: string;
  colour: string;
}

interface LastCheckIn {
  checked_in_at: string;
  method: string;
}

interface Avatar {
  id: string;
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
}

export interface CreateCustomerBody {
  site_id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  dob?: string;
  email: string;
  password?: string;
  marketing_preference_ids?: string[];
  external_ref?: string;
  guestline_ref?: string;
  preferred_locale?: string;
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
  data: MemebershipRateData[];
  meta: Meta;
}

export interface MemebershipRateData {
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
