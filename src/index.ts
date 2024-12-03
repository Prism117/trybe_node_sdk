import axios, { AxiosError, AxiosRequestConfig } from "axios";

import Appointments from "./resources/appointments.js";
import Availability from "./resources/availability.js";
import Calendar from "./resources/calendar.js";
import Customers from "./resources/customer.js";
import Memberships from "./resources/memberships.js";
import Order from "./resources/orders.js";
import Packages from "./resources/packages.js";
import Payments from "./resources/payments.js";
import Practitioners from "./resources/practitioners.js";
import Products from "./resources/products.js";
import Sessions from "./resources/sessions.js";
import Webhooks from "./resources/webhooks.js";

import type { Method } from "./types.js";
import { TrybeError } from "./error.js";

export default class Trybe {
  //auth
  token;
  siteId;
  isSandbox;
  //resources
  readonly appointments;
  readonly availability;
  readonly memberships;
  readonly orders;
  readonly packages;
  readonly payments;
  readonly sessions;
  readonly webhooks;

  constructor(
    credentials: { token: string; siteId: string },
    isSandbox = false
  ) {
    this.token = credentials.token;
    this.siteId = credentials.siteId;
    this.isSandbox = isSandbox;

    //? Getters or readonly properties?
    this.appointments = new Appointments(this);
    this.availability = new Availability(this);
    this.memberships = new Memberships(this);
    this.orders = new Order(this);
    this.packages = new Packages(this);
    this.payments = new Payments(this);
    this.sessions = new Sessions(this);
    this.webhooks = new Webhooks(this);
  }

  get calendar() {
    return new Calendar(this);
  }
  get customers() {
    return new Customers(this);
  }

  get practioners() {
    return new Practitioners(this);
  }

  get products() {
    return new Products(this);
  }

  /**
   * Trybe-Fitted Request Method
   * @param options.params - Query String Params
   * @param options.body - JSON Request Body
   * @param options.method - Request Method ie. GET
   * @param options.fetchAll - Enable Auto Pagination (default true)
   * @param options.returnMeta - Return default { data, meta }
   */
  async fetch<T = Promise<unknown>>(
    endpoint: string,
    options?: {
      params?: any;
      body?: any;
      method?: Method;
      fetchAll?: boolean;
      returnMeta?: boolean;
    }
  ): Promise<T> {
    // Handle URL
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint;
    }
    const baseUrl = this.isSandbox
      ? "https://api.playground.try.be"
      : "https://api.try.be";

    // Handle Parameters
    const url = baseUrl + endpoint;
    const headers = { Authorization: `Bearer ${this.token}` };
    const requestOptions: AxiosRequestConfig = {
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

    try {
      //Inital Request
      const response = await axios(requestOptions);
      const resBody = response.data;

      //Typical Trybe GET Response {data, meta}
      if (!resBody?.data || options?.returnMeta) {
        return resBody;
      }

      const data = resBody.data;
      const meta = resBody?.meta;

      //Handle Additional Pages
      if (meta && meta?.last_page && options?.fetchAll != false) {
        const lastPage = meta?.last_page;

        let nextPage = meta.current_page + 1;

        while (nextPage <= lastPage) {
          console.log(
            `TRYBE | fetching next page: ${nextPage}/${meta.last_page}`
          );
          requestOptions.params = {
            ...requestOptions.params,
            page: nextPage,
          };
          const additResponse = await axios(requestOptions);
          const nextData = additResponse?.data?.data;
          if (!nextData) {
            console.warn("TRYBE | Pagination request returned no data.");
            break;
          }
          data.push(...nextData);
          nextPage++;
        }
      }
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          throw new TrybeError(error.response.data.message);
        }
        throw new TrybeError();
      }
      throw error;
    }
  }
}
