export interface PackageType {
  id: string;
  name: string;
  description: string;
  product_code: string;
  item_choices: ItemChoice[];
  currency: string;
  image: PackageImage;
  site_id: string;
  availability_rules: PackageAvailabilityRule[];
  max_daily_duration: number;
  prevent_choice_overlaps: boolean;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
  price_rules: PackagePriceRule[];
  meta: PackageMeta;
  upsell_offerings: OtherPackageOffering[];
  cross_sell_offerings: OtherPackageOffering[];
  related_retail_offerings: OtherPackageOffering[];
  offered_online: boolean;
  private: boolean;
  members_only: boolean;
  permitted_membership_type_ids: string[];
  membership_booking_windows_enabled: boolean;
  membership_booking_windows: PackageMembershipBookingWindow[];
  customer_cancellation_permitted: string;
  customer_cancellation_min_duration: string;
  category_ids: string[];
  categories: Category[];
  min_guests: number;
  max_guests: number;
  default_revenue_centre: string;
  email_options: EmailOptions;
  updated_at: string;
  deleted_at: string;
}

export interface OtherPackageOffering {
  offering_type: string;
  offering_id: string;
  offering_name: string;
  offering_config: any;
  display_name: string;
}

export interface PackageMeta {
  title: string;
  description: string;
}

export interface PackageAvailabilityRule {
  id: string;
  date_from: string;
  date_to: string;
  time_from: string;
  time_to: string;
  weekday: string;
  weekdays: string[];
  is_available: boolean;
}

export interface ItemChoice {
  id: string;
  name: string;
  description: string;
  min_options: number;
  max_options: number;
  option_budget: number;
  auto_select_timeslot: boolean;
  hide_times: boolean;
  optional: boolean;
  visible: boolean;
  allow_overlaps: boolean;
  offering_type: string;
  allocation: Allocation;
  start_time_rules: StartTimeRule[];
  options: Option[];
}

export interface Allocation {
  revenue_centre: string;
  amount: number;
}

export interface StartTimeRule {
  type: string;
  relative_to: string;
  relative_mins_from: number;
  relative_mins_to: number;
  absolute_time_from: string;
  absolute_time_to: string;
}

export interface Option {
  id: string;
  item_type: string;
  price_change: number;
  offering: Offering;
}

export interface Offering {
  id: string;
  name: string;
  description: string;
  price_from: number;
  price_to: number;
  discounted_price_from: number;
  currency: string;
  image: PackageImage;
  duration: number;
  durations: number[];
  type: string;
  has_availability: boolean;
  next_available_date: string;
  item_choices: ItemChoice[];
  min_guests: number;
  max_guests: number;
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  organisation_id: string;
}

export interface PackageImage {
  id: string;
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
}

export interface EmailOptions {
  hide_prices: boolean;
}

export interface PackagePriceRule {
  id: string;
  package_id: string;
  date_from: string;
  date_to: string;
  weekdays: string[];
  price: number;
}

export interface PackageMembershipBookingWindow {
  membership_type_id: string;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
}
