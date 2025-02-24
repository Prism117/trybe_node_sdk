export interface AppointmentType {
  id: string;
  name: string;
  description: string;
  product_code: string;
  currency: string;
  image_id: string;
  image: Image;
  practitioner_ids: string[];
  availability_rules: AvailabilityRule[];
  enquiries_enabled: boolean;
  upsell_offerings: OtherOffering[];
  cross_sell_offerings: OtherOffering[];
  related_retail_offerings: OtherOffering[];
  price_rules: PriceRule[];
  durations: number[];
  end_buffer: number;
  start_time_interval: number;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
  allocate_multi_capacity_rooms: boolean;
  members_only: boolean;
  permitted_membership_type_ids: string[];
  membership_booking_windows_enabled: boolean;
  membership_booking_windows: MembershipBookingWindow[];
  meta: Meta;
  customer_cancellation_permitted: string;
  customer_cancellation_min_duration: string;
  tag_ids: string[];
  tags: Tag[];
  category_ids: string[];
  categories: Category[];
  site_ids: string[];
  equipment_ids: string[];
  room_ids: string[];
  contraindications: Contraindication[];
  offered_online: boolean;
  private: boolean;
  min_guests: number;
  max_guests: number;
  revenue_centre: string;
  updated_at: string;
  deleted_at: string;
}

export interface Image {
  id: string;
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
}

export interface AvailabilityRule {
  id: string;
  date_from: string;
  date_to: string;
  time_from: string;
  time_to: string;
  weekday: string;
  weekdays: string[];
  is_available: boolean;
}

export interface OtherOffering {
  offering_type: string;
  offering_id: string;
  offering_name: string;
  offering_config: any;
  display_name: string;
}

export interface PriceRule {
  id: string;
  appointment_type_id: string;
  date_from: string;
  date_to: string;
  weekdays: string[];
  time_from: string;
  time_to: string;
  duration: number;
  price: number;
}

export interface MembershipBookingWindow {
  membership_type_id: string;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
}

export interface Meta {
  title: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  organisation_id: string;
}

export interface Category {
  id: string;
  name: string;
  organisation_id: string;
}

export interface Contraindication {
  id: string;
  name: string;
  description: string;
}
