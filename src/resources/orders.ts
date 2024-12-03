//Types
import type Trybe from "../index.js";

//TODO: Move to Type file
import type { OrderItem } from "../types.js";
import type { OrderQuery, Order } from "../types/orders.js";

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

export default class Orders {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getAll(query: OrderQuery) {
    return this.#trybe.fetch<Order[]>("/shop/orders", {
      params: { ...query, site_id: this.#trybe.siteId },
    });
  }

  addItem(orderId: string, item: OrderItem, skipAvailabilityChecks = false) {
    const endpoint = `/shop/orders/${orderId}/items`;
    return this.#trybe.fetch(endpoint, {
      method: "POST",
      body: item,
      params: { skip_availability_checks: skipAvailabilityChecks },
    });
  }

  addPayment(orderId: string, body: PaymentBody, skipAvailability = false) {
    const endpoint = `/shop/orders/${orderId}/payments`;
    return this.#trybe.fetch(endpoint, {
      params: { skip_availability_checks: skipAvailability },
      body,
      method: "POST",
    });
  }

  getIntakeForms(orderId: string) {
    return this.#trybe.fetch<
      Array<{
        basket_id: string;
        visit_intake_form_id?: string;
        guest_id: string;
        name: string;
        first_name: string;
        intake_form_url: string;
        completed_at?: string;
      }>
    >(`/shop/order-intake-forms/${orderId}`);
  }

  update(orderId: string, update: any) {
    return this.#trybe.fetch(`/shop/orders/${orderId}`, {
      method: "PUT",
      body: update,
    });
  }

  applyDiscount(orderId: string, discountId: string) {
    return this.#trybe.fetch(`/shop/orders/${orderId}/discounts`, {
      method: "POST",
      body: {
        discount_type_code: discountId,
        discount_amount: "100",
        amount_type: "percentage",
      },
    });
  }

  settle(orderId: string) {
    return this.#trybe.fetch(`/shop/orders/${orderId}/settle`, {
      method: "POST",
    });
  }
}
