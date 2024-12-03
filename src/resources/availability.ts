//Types
import type Trybe from "../index.js";
import type { SessionQuery } from "../types.js";

export default class Availability {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  /**
   * Get Session Availability
   */

  sessions(sessionId: string, query: SessionQuery) {
    return this.#trybe.fetch(
      `/shop/item-availability/sessions/${this.#trybe.siteId}/${sessionId}`,
      { params: query }
    );
  }

  

  allOfferings(query: { date?: string; category?: string } = {}) {
    return this.#trybe.fetch("/shop/shop/offerings", {
      params: { site_id: this.#trybe.siteId, ...query },
      returnMeta: true,
    });
  }

  //TODO: WIP
  //
  makeUnavailable(blocked: BlockedItems[], dates: BlockOutParams) {}
}

type BlockedItems = "sessions" | "packages" | "appointments";
// Todo: Move to Types File
type BlockOutDates =
  | {
      date: string;
      dateStart?: never;
      dateEnd?: never;
    }
  | { dateStart: string; dateEnd: string; date?: never };

type BlockOutParams = BlockOutDates & {};
