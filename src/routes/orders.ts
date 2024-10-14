import { AxiosError } from "axios";
import type { Fetcher, OrderItem } from "../types.js";
interface PaymentBody {
  processor?: string;
  capture_method?: string;
  amount?: number;
  currency?: string;
  status:
    | "pending"
    | "paid"
    | "ready_for_capture"
    | "payment_method_stored"
    | "payment_method_charged"
    | "requires_action"
    | "expired"
    | "failed";
  details_source?: string;
  processor_data?: unknown;
}

export default class Order {
  #fetcher;
  constructor(fetcher: Fetcher) {
    this.#fetcher = fetcher;
  }

  async addItem(
    orderId: string,
    item: OrderItem,
    skipAvailabilityChecks = false
  ) {
    const endpoint = `/shop/orders/${orderId}/items`;
    try {
      const response = await this.#fetcher(endpoint, {
        method: "POST",
        body: item,
        params: { skip_availability_checks: skipAvailabilityChecks },
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async addPayment(
    orderId: string,
    body: PaymentBody,
    skipAvailability = false
  ) {
    const endpoint = `/shop/orders/${orderId}/payments`;
    try {
      const res = await this.#fetcher(endpoint, {
        params: { skip_availability_checks: skipAvailability },
        body,
        method: "POST",
      });
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }
}
