import type Trybe from "../index.js";

export default class Calendar {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getEvents(query: Query) {
    return this.#trybe.fetch<CalendarResponse>("/shop/calendar-events-v2", {
      params: { ...query, site_id: this.#trybe.siteId },
      returnMeta: true,
    });
  }
}

interface Query {
  date: string;
  view_type?: "area" | "practitioner" | "room";
  zone_id?: string;
  include_customers?: boolean;
  include_payments?: boolean;
  events?: string;
}

interface CalendarResponse {
  data: Data[];
  meta: Meta;
}

interface Data {
  key: string;
  id: string;
  resource_id: string;
  resource_type: string;
  event_type: string;
  status: string;
  reserved_until: string;
  start_time: string;
  end_time: string;
  duration: number;
  end_buffer: number;
  offering_id: string;
  offering_name: string;
  product_code: string;
  order: Order;
  bookings: Booking[];
  guests: Guest2[];
  practitioners: Practitioner[];
  rooms: Room[];
  areas: Area[];
  locked: boolean;
  blocked_time_details: BlockedTimeDetails;
  session_details: SessionDetails;
  num_overlaps: number;
  overlap_order: number;
}

interface Order {
  id: string;
  order_ref: string;
  customer: Customer;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  stage: string;
  labels: Label2[];
  notes: Note[];
  payment_totals: PaymentTotals;
  special_requests: string;
  is_locked: boolean;
  has_posting_room: boolean;
  external_visit_ref: string;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  labels: Label[];
}

interface Label {
  id: string;
  value: string;
  colour: string;
}

interface Label2 {
  id: string;
  name: string;
  color: string;
  order_id: string;
}

interface Note {
  id: string;
  order_id: string;
  content: string;
  created_by: CreatedBy;
  created_by_id: string;
  created_at: string;
}

interface CreatedBy {
  id: string;
  name: string;
}

interface PaymentTotals {
  paid: number;
  pending: number;
  chargeable: number;
  provided: number;
  missing: number;
  unpaid: number;
}

interface Booking {
  id: string;
  booking_type: string;
  status: string;
  order: Order2;
  guests: Guest[];
}

interface Order2 {
  id: string;
  order_ref: string;
  customer: Customer2;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  stage: string;
  labels: Label4[];
  notes: Note2[];
  payment_totals: PaymentTotals2;
  special_requests: string;
  is_locked: boolean;
  has_posting_room: boolean;
  external_visit_ref: string;
}

interface Customer2 {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  labels: Label3[];
}

interface Label3 {
  id: string;
  value: string;
  colour: string;
}

interface Label4 {
  id: string;
  name: string;
  color: string;
  order_id: string;
}

interface Note2 {
  id: string;
  order_id: string;
  content: string;
  created_by: CreatedBy2;
  created_by_id: string;
  created_at: string;
}

interface CreatedBy2 {
  id: string;
  name: string;
}

interface PaymentTotals2 {
  paid: number;
  pending: number;
  chargeable: number;
  provided: number;
  missing: number;
  unpaid: number;
}

interface Guest {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  customer_id: string;
}

interface Guest2 {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  customer_id: string;
}

interface Practitioner {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
}

interface BlockedTimeDetails {
  type: string;
  label: string;
  notes: string;
  color: any;
  created_by: CreatedBy3;
  created_at: string;
}

interface CreatedBy3 {
  id: string;
  name: string;
  email: string;
}

interface SessionDetails {
  capacity: number;
  waitlist_enabled: boolean;
}

interface Meta {
  occupancy_per_day: number;
  occupancy_for_view: number;
  occupancy_per_hour: OccupancyPerHour[];
}

interface OccupancyPerHour {
  time: string;
  guests: number;
}
