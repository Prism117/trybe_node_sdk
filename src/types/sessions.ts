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

export interface RecurringOptionReturn {
  id: string;
  name: string;
  practitioner?: {
    id: string;
    name: string;
  };
  room: {
    id: string;
    name: string;
  };
  weekdays: string[];
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

interface Reference {
  name: string;
  id: string;
}

export interface SessionType {
  id: string;
  name: string;
  description: string;
  product_code: string;
  currency: string;
  image_id: string;
  image: SessionImage;
  offered_online: boolean;
  private: boolean;
  site_id: string;
  duration: number;
  max_baskets_per_session: number;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
  members_only: boolean;
  max_bookings_per_member: number;
  permitted_membership_type_ids: string[];
  membership_booking_windows_enabled: boolean;
  membership_booking_windows: SessionMembershipBookingWindow[];
  customer_cancellation_permitted: string;
  customer_cancellation_min_duration: string;
  waitlist_enabled: boolean;
  min_guests: number;
  max_guests: number;
  price_rules: SessionPriceRule[];
  category_ids: string[];
  categories: SessionCategory[];
  recurrence_groups: RecurrenceGroup[];
  meta: SessionMeta;
  upsell_offerings: UpsellOffering[];
  cross_sell_offerings: CrossSellOffering[];
  related_retail_offerings: RelatedRetailOffering[];
  revenue_centre: string;
  updated_at: string;
  deleted_at: string;
}

export interface SessionImage {
  id: string;
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
}

export interface SessionMembershipBookingWindow {
  membership_type_id: string;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
}

export interface SessionPriceRule {
  id: string;
  session_type_id: string;
  date_from: string;
  date_to: string;
  weekday: string;
  weekdays: string[];
  start_time: string;
  end_time: string;
  price: number;
}

export interface SessionCategory {
  id: string;
  name: string;
  organisation_id: string;
}

export interface RecurrenceGroup {
  id: string;
  name: string;
  practitioner: Reference;
  room: Reference;
  weekdays: string[];
  start_time: string;
  capacity: number;
  recurrence_start: string;
  recurrence_end: string;
}

export interface SessionMeta {
  title: string;
  description: string;
}

export interface UpsellOffering {
  offering_type: string;
  offering_id: string;
  offering_name: string;
  offering_config: any;
  display_name: string;
}

export interface CrossSellOffering {
  offering_type: string;
  offering_id: string;
  offering_name: string;
  offering_config: any;
  display_name: string;
}

export interface RelatedRetailOffering {
  offering_type: string;
  offering_id: string;
  offering_name: string;
  offering_config: any;
  display_name: string;
}
