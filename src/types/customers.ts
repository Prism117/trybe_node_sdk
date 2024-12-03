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

export interface Customer {
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

export interface CustomerCredit {
  id: string;
  coupon_name: string;
  coupon_description: string;
  customer_id: string;
  membership_id: string;
  coupon_code: string;
  multi_use: number;
  issued_at: string;
  expires_at?: string;
  redeemed_at?: string;
  revoked_at?: string;
}
