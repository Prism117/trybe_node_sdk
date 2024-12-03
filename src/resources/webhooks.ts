import type Trybe from "../index.js";

export default class Webhooks {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  create(
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
      site_id: this.#trybe.siteId,
    };

    return this.#trybe.fetch("/shop/webhook-configs", {
      method: "POST",
      body,
    });
  }

  getAll() {
    return this.#trybe.fetch("/shop/webhook-configs", {
      params: { site_id: this.#trybe.siteId },
    });
  }
}
