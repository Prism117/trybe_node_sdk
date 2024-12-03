export interface OrderQuery {
  query?: string;
  customer_id?: string;
  status?: "settled" | "submitted" | "cancelled" | "new" | "no show";
  labels?: string;
  page?: number;
  per_page?: number;
  item_offering_id?: string;
  submitted_by_id?: string;
  revenue_date_from?: string;
  revenue_date_to?: string;
  item_date?: string;
  item_date_from?: string;
  item_date_to?: string;
  item_status?: "confirmed" | "reserved" | "waitlisted" | "cancelled";
  submitted_at_from?: string;
  submitted_at_to?: string;
  updated_at_from?: string;
  updated_at_to?: string;
  is_membership?: boolean;
  has_outstanding_balance?: boolean;
  sales_channel?: string;
}

export interface Order {
  id: string;
  organisation_id: string;
  site_id: string;
  order_ref: string;
  status: string;
  stage: string;
  sales_channel: SalesChannel;
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  labels: Label[];
  guests: Guest[];
  visit: Visit;
  booking_items: BookingItem[];
  package_items: PackageItem[];
  booking_items_start_date: string;
  booking_items_end_date: string;
  booking_items_span_multiple_days: boolean;
  purchase_items: PurchaseItem[];
  items_status: string;
  order_notes: OrderNote[];
  currency: string;
  total_cost: number;
  total_tax: number;
  net_total: number;
  submit_payment_amount: number;
  submit_auth_amount: number;
  outstanding_payment_amount: number;
  total_paid_or_authed: number;
  service_charge: ServiceCharge;
  tip_amount: number;
  totals: Totals;
  payment_totals: PaymentTotals;
  taxes: Tax[];
  payments: Payment[];
  discounts: OrderDiscount[];
  applied_promo_code_id: string;
  applied_promo_code: AppliedPromoCode;
  applied_promo_code_discount_total: number;
  is_promo_code_discount_applied: boolean;
  promo_code_applied_by: AppliedBy;
  promo_code_applied_at: string;
  coupon_codes: Coupon[];
  voucher_codes: VoucherCode[];
  discount_total: number;
  special_requests: string;
  intake_form_id: string;
  customer_intake_form_submission_id: string;
  intake_form_url: string;
  new_intake_form_url: string;
  intake_forms_complete: boolean;
  intake_form_required: boolean;
  is_locked: boolean;
  locked_at: string;
  has_posted: boolean;
  posted_at: string;
  last_post_attempt: string;
  is_customer_required: boolean;
  post_to_room_config: PostToRoomConfig;
  external_visit_ref: string;
  external_ref: string;
  created_at: string;
  integration_config_id: string;
  updated_at: string;
  submitted_at: string;
}

export interface SalesChannel {
  id: string;
  organisation_id: string;
  name: string;
}
export interface Label {
  id: string;
  name: string;
  color: string;
  order_id: string;
}

export interface Guest {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  is_lead_booker: boolean;
  intake_form_submission_id: string;
  intake_form_complete: boolean;
  intake_form_submitted_at: string;
}

export interface Visit {
  id: string;
  visit_ref: string;
  visit_type: {
    id: string;
    name: string;
  };
  status: string;
  arrival_date: string;
  departure_date: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  should_send_reminder_at: string;
  created_at: string;
  updated_at: string;
}

export interface BookingItem {
  id: string;
  status: string;
  item_type: string;
  type_id: string;
  type_name: string;
  type_product_code: string;
  booking_summary: BookingSummary;
  guest: Guest;
  guests: Guest[];
  booking_reserved_until: string;
  total_cost: number;
  net_total: number;
  price: number;
  base_price: number;
  discount_amount: number;
  discounts: Discount[];
  date: string;
  start_time: string;
  added_by_customer: boolean;
  sold_by: Reference & { type: string };
  created_at: string;
  updated_at: string;
  is_modifiable: boolean;
}

export interface BookingSummary {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
  practitioner_ids: string[];
  practitioners: Reference[];
  room_id: string;
  room: Reference;
  area_ids: string[];
  areas: Reference[];
  equipment_ids: string[];
  equipment: Reference[];
  practitioner_was_requested: boolean;
  room_was_requested: boolean;
  session_id: string;
  created_at: string;
  updated_at: string;
  status: string;
  offering: Reference & { type: string };
}

export interface Reference {
  id: string;
  name: string;
}

export interface Discount {
  id: string;
  name: string;
  amount_type: string;
  calculated_amount: number;
  coupon_code_id: string;
  currency: string;
  fixed_amount: number;
  percentage: number;
  reason_code: string;
  coupon: Coupon;
  applicable_for: string;
}

type OrderDiscount = Discount & {
  discount_type_id: string;
  is_custom_amount: boolean;
  added_by_id: string;
  discount_type_code: string;
  discount_amount: number;
  applied_by: AppliedBy;
  applied_at: string;
  site_id: string;
};

export interface Discount4 {
  id: string;
  amount_type: string;
  fixed_amount: number;
  percentage: number;
  calculated_amount: number;
  currency: string;
  discount_type_id: string;
  is_custom_amount: boolean;
  coupon_code_id: string;
  coupon: Coupon;
  reason_code: string;
  added_by_id: string;
  discount_type_code: string;
  applicable_for: string;
  discount_amount: number;
  applied_by: AppliedBy;
  applied_at: string;
  site_id: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  customer_credit_id: string;
}

export interface PackageItem {
  id: string;
  item_type: string;
  type_id: string;
  type_name: string;
  type_product_code: string;
  guest: Guest;
  guests: Guest[];
  total_cost: number;
  net_total: number;
  price: number;
  base_price: number;
  discount_amount: number;
  date: string;
  added_by_customer: boolean;
  sold_by: Reference & { type: string };
  created_at: string;
  updated_at: string;
  status: string;
  package_items: SubPackageItem[];
  discounts: Discount[];
  is_modifiable: boolean;
  option_budgets: OptionBudget[];
}

export interface SubPackageItem {
  id: string;
  choice_id: string;
  option_id: string;
  shared_basket_item_id: string;
  offering_type: string;
  offering_id: string;
  offering_name: string;
  time: string;
  duration: number;
  guests: Guest[];
  item_configuration: any;
  reserved_until: string;
  booking_summary: BookingSummary;
}

export interface AppliedBy {
  id: string;
  name: string;
  email: string;
}

export interface OptionBudget {
  choice_id: string;
  budget: number;
  spent: number;
  remaining: number;
}

export interface PurchaseItem {
  id: string;
  item_type: string;
  type_id: string;
  type_name: string;
  type_product_code: string;
  quantity: number;
  unit_price: number;
  base_price: number;
  total_cost: number;
  net_total: number;
  status: string;
  guest: Guest;
  guests: Guest[];
  discount_amount: number;
  discounts: Discount[];
  added_by_customer: boolean;
  sold_by: Reference & { type: string };
  created_at: string;
  updated_at: string;
  item_configuration: any;
  purchasable_details: any;
  is_modifiable: boolean;
}

export interface Totals {
  subtotal: number;
  order_discount: number;
  total: number;
}

export interface PaymentTotals {
  paid: number;
  pending: number;
  chargeable: number;
  provided: number;
  missing: number;
  unpaid: number;
}

export interface OrderNote {
  id: string;
  order_id: string;
  content: string;
  created_by: Reference;
  created_by_id: string;
  created_at: string;
}

export interface ServiceCharge {
  amount: number;
  percentage: number;
  item_amounts: ItemAmount[];
}

export interface ItemAmount {
  item_id: string;
  amount: number;
  percentage: number;
}

export interface Tax {
  name: string;
  percentage: number;
  amount: number;
  inclusive: boolean;
}

export interface Payment {
  id: string;
  processor: string;
  capture_method: string;
  amount: number;
  currency: string;
  status: string;
  details_source: string;
  processor_data: any;
  failure_reason: string;
  paid_at: string;
  created_at: string;
  refundable_amount: number;
  refunds: Refund[];
}

export interface Refund {
  id: string;
  payment_id: string;
  amount: number;
  currency: string;
  notes: string;
  status: string;
  processor_data: any;
  created_at: string;
}

export interface AppliedPromoCode {
  id: string;
  code: string;
  percentage: number;
}

export interface VoucherCode {
  id: string;
  code: string;
  voucher_type_id: string;
  coupon_code_id: string;
  name: string;
  description: string;
  amount_type: string;
  is_redeemed: boolean;
}

export interface PostToRoomConfig {
  processor_data: {
    "G#": number;
    RN: string;
  };
  associated_at: string;
}
