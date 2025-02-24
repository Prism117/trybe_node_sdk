//Types
import type Trybe from "../index.js";
import type { SessionQuery } from "../types/sessions.js";

export default class Availability {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  /**
   * Get Session Availability
   */

  sessions(sessionTypeId: string, query: SessionQuery) {
    return this.#trybe.fetch(
      `/shop/item-availability/sessions/${this.#trybe.siteId}/${sessionTypeId}`,
      { params: query }
    );
  }

  allOfferings(query: { date?: string; category?: string } = {}) {
    return this.#trybe.fetch("/shop/shop/offerings", {
      params: { site_id: this.#trybe.siteId, ...query },
      returnMeta: true,
    });
  }
}
