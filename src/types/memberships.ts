import type { Customer } from "./customers.js";
type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface CreateMembershipBody {
  customer_id: string;
  membership_type_id: string;
  membership_rate_id: string;
  start_date?: string;
  end_date?: string;
}

export interface CreateMember
  extends Require<CreateMembershipBody, "end_date" | "start_date"> {
  basket_id?: string;
  external_ref?: string;
  source: "app" | "self_signup";
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

export interface Membership {
  id: string;
  site_id: string;
  membership_number: string;
  customer: Customer;
  members: Member[];
  type: MembershipType;
  rate: MembershipRate;
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
  rates: MembershipRate[];
  revenue_schedule: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface MembershipRate {
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

export interface PaymentMethod {
  id: string;
  type: string;
  last_4: string;
  status: string;
  card_brand: string;
}
