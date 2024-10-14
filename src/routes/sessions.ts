import { AxiosError } from "axios";
import { Fetcher, RecurringOptions } from "../types.js";

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

export default class Sessions {
  #fetcher;
  siteId;
  constructor(fetcher: Fetcher, siteId: string) {
    this.#fetcher = fetcher;
    this.siteId = siteId;
  }
  async getRooms() {
    const endpoint = "/shop/rooms";
    try {
      const data = await this.#fetcher(endpoint, {
        params: { site_id: this.siteId },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async addRecurring(sessionId: string, options: RecurringOptions) {
    const endpoint = `/shop/session-types/${sessionId}/recurrence-groups`;
    try {
      const data = await this.#fetcher(endpoint, {
        body: options,
        method: "POST",
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async getAllDetails(query?: AllSessionQuery) {
    try {
      const data = await this.#fetcher("/shop/sessions", { params: query });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async getTypes(query?: {
    page?: number;
    per_page?: number;
    session_type_id?: string;
    archived?: boolean;
  }) {
    try {
      const data = await this.#fetcher("/shop/session-types", {
        params: { ...query, site_id: this.siteId },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }
}
