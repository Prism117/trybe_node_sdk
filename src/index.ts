import axios from "axios";

import Memberships from "./routes/memberships.js";
import Sessions from "./routes/sessions.js";
import Availability from "./routes/availability.js";
import Webhooks from "./routes/webhooks.js";
import Customer from "./routes/customer.js";
import Payments from "./routes/payments.js";
import Order from "./routes/orders.js";

import type { Method } from "./types.js";

export default class Trybe {
  //auth
  token;
  siteId;
  isSandbox;
  //actions
  availability;
  sessions;
  webhooks;
  memberships;
  orders;
  customers;
  payments;
  constructor(
    credentials: { token: string; siteId: string },
    isSandbox = false
  ) {
    this.token = credentials.token;
    this.siteId = credentials.siteId;
    this.isSandbox = isSandbox;

    this.availability = new Availability(
      this.#fetch.bind(this),
      credentials.siteId
    );
    this.sessions = new Sessions(this.#fetch.bind(this), credentials.siteId);
    this.webhooks = new Webhooks(this.#fetch.bind(this), credentials.siteId);
    this.memberships = new Memberships(
      this.#fetch.bind(this),
      credentials.siteId
    );
    this.orders = new Order(this.#fetch.bind(this));
    this.customers = new Customer(this.#fetch.bind(this), credentials.siteId);
    this.payments = new Payments(this.#fetch.bind(this));
  }
  async #fetch(
    endpoint: string,
    options?: { params?: any; body?: any; method?: Method }
  ) {
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint;
    }
    const baseUrl = this.isSandbox
      ? "https://api.playground.try.be"
      : "https://api.try.be";

    const url = baseUrl + endpoint;
    const headers = { Authorization: `Bearer ${this.token}` };
    let requestOptions: {
      url: string;
      method: Method;
      headers: any;
      params?: any;
      data?: any;
    } = {
      url,
      method: options?.method ?? "GET",
      headers,
    };
    if (options?.params) {
      requestOptions["params"] = options.params;
    }
    if (options?.body) {
      requestOptions["data"] = options.body;
    }
    const response = await axios(requestOptions);
    return response.data;
  }
}
