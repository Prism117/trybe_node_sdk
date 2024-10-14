import { AxiosError } from "axios";
import { Fetcher } from "../types.js";

export default class Webhooks {
  #fetcher;
  siteId;
  constructor(fetcher: Fetcher, siteId: string) {
    this.#fetcher = fetcher;
    this.siteId = siteId;
  }

  async create(
    name: string,
    url: string,
    events: Array<"basket.submitted" | "basket.cancelled" | "basket.settled">
  ) {
    const body = {
      name,
      url,
      method: "post",
      events,
      notification_emails: ["cpatten@cascada.me"],
      enabled: true,
      site_id: this.siteId,
    };
    try {
      const data = await this.#fetcher("/shop/webhook-configs", {
        method: "POST",
        body,
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
