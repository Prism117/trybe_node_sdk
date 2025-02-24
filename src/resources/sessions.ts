//Types
import type Trybe from "../index.js";
import type {
  RecurringOptionReturn,
  RecurringOptions,
  SessionType,
} from "../types/sessions.js";

//Todo: Move to Types File
interface AllSessionQuery {
  page?: number;
  per_page?: number;
  start_time_from?: string;
  start_time_to?: string;
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

  updateRecurring(
    sessionId: string,
    groupId: string,
    update?: Partial<RecurringOptions>
  ) {
    return this.#trybe.fetch<RecurringOptionReturn>(
      `/shop/session-types/${sessionId}/recurrence-groups/${groupId}`,
      { method: "PUT", body: update }
    );
  }

  getAllDetails(query?: AllSessionQuery) {
    return this.#trybe.fetch("/shop/sessions", { params: query });
  }

  /**
   * @param {Object} query
   * @param query.session_type_id - Comma Separated List
   *
   * {@link https://openapi.try.be/#operation/sessionTypeIndex|View Docs}
   */
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

  /**
   *
   * @param sessionId
   * @param updates
   * @returns
   */
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
