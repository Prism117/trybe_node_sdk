import { AxiosError } from "axios";
import type { Fetcher } from "../types.js";

interface PaymentQuery {
  customer_id?: string;
  type?: string;
  processor?: string;
  status?: string;
  membership_payment_method?: string;
  per_page?: number;
  page?: number;
}

export default class Payments {
  #fetcher;
  constructor(fetcher: Fetcher) {
    this.#fetcher = fetcher;
  }

  async getAll(query?: PaymentQuery) {
    const endpoint = "/customers/payment-methods";
    try {
      const data = await this.#fetcher(endpoint, {
        params: query,
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
