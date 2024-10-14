import { Fetcher } from "../types.js";
import { SessionQuery } from "../types.js";

export default class Availability {
  #fetcher;
  siteId;
  constructor(fetcher: Fetcher, siteId: string) {
    this.#fetcher = fetcher;
    this.siteId = siteId;
  }

  async sessions(sessionId: string, query: SessionQuery) {
    try {
      const data = await this.#fetcher(
        `/shop/item-availability/sessions/${this.siteId}/${sessionId}`,
        { params: query }
      );
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
