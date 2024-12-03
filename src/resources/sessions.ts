//Types
import type Trybe from "../index.js";
import type { RecurringOptions } from "../types.js";

//Todo: Move to Types File
interface AllSessionQuery {
  page?: number;
  per_page?: number;
  start_time_from?: string;
  session_type_id?: string;
  recurrence_group_id?: string;
  include_booking?: boolean;
  include_cancelled?: boolean;
  cancelled?: boolean;
  practicioner_id?: string;
}

/**
 *  https://openapi.try.be/#tag/Sessions
 */
export default class Sessions {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getRooms() {
    return this.#trybe.fetch("/shop/rooms", {
      params: { site_id: this.#trybe.siteId },
    });
  }

  deleteGroup(sessionId: string, groupId: string) {
    return this.#trybe.fetch(
      `/shop/session-types/${sessionId}/recurrence-groups/${groupId}`,
      { method: "DELETE" }
    );
  }

  addRecurring(sessionId: string, options: RecurringOptions) {
    const endpoint = `/shop/session-types/${sessionId}/recurrence-groups`;
    return this.#trybe.fetch(endpoint, {
      body: options,
      method: "POST",
    });
  }

  getAllDetails(query?: AllSessionQuery) {
    return this.#trybe.fetch("/shop/sessions", { params: query });
  }

  getTypes(query?: {
    page?: number;
    per_page?: number;
    session_type_id?: string;
    archived?: boolean;
  }) {
    return this.#trybe.fetch<SessionType[]>("/shop/session-types", {
      params: { ...query, site_id: this.#trybe.siteId },
    });
  }

  delete(sessionId: string) {
    return this.#trybe.fetch(`/shop/sessions/${sessionId}`, {
      method: "DELETE",
    });
  }

  updateType(sessionId: string, updates: any) {
    return this.#trybe.fetch(`/shop/session-types/${sessionId}`, {
      method: "PUT",
      body: updates,
    });
  }

  /**
   * Updates start date for all sessions of a given session type.
   */
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
  image: Image;
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
  membership_booking_windows: MembershipBookingWindow[];
  customer_cancellation_permitted: string;
  customer_cancellation_min_duration: string;
  waitlist_enabled: boolean;
  min_guests: number;
  max_guests: number;
  price_rules: PriceRule[];
  category_ids: string[];
  categories: Category[];
  recurrence_groups: RecurrenceGroup[];
  meta: Meta;
  upsell_offerings: UpsellOffering[];
  cross_sell_offerings: CrossSellOffering[];
  related_retail_offerings: RelatedRetailOffering[];
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

export interface MembershipBookingWindow {
  membership_type_id: string;
  max_advance_bookings_interval: string;
  min_advance_bookings_interval: string;
}

export interface PriceRule {
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

export interface Category {
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

export interface Meta {
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
