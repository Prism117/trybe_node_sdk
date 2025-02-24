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

  /**
   * @returns Order object with methods
   */
  async createOrder(orderParams: {
    customer_id?: string;
    status?: string;
    external_ref?: string;
  }) {
    const order = await this.create(orderParams);
    return new OrderBuilder(this.#trybe.orders, order);
  }

  async create(orderParams: {
    customer_id?: string;
    status?: string;
    external_ref?: string;
  }) {
    return this.#trybe.fetch<Order>("/shop/orders", {
      body: { ...orderParams, site_id: this.#trybe.siteId },
      method: "POST",
    });
  }

  find(query: OrderQuery) {
    return this.#trybe.fetch<Order[]>("/shop/orders", {
      params: { ...query, site_id: this.#trybe.siteId },
    });
  }

  findOne(orderId: string) {
    return this.#trybe.fetch<Order>(`/shop/orders/${orderId}`);
  }

  addItem(orderId: string, item: OrderItem, skipAvailabilityChecks = false) {
    const endpoint = `/shop/orders/${orderId}/items`;
    return this.#trybe.fetch<OrderItem>(endpoint, {
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

  updateTip(orderId: string, amount: number) {
    return this.#trybe.fetch(`/shop/orders/${orderId}/tip`, {
      method: "PUT",
      body: { amount },
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
    return this.#trybe.fetch<Order>(`/shop/orders/${orderId}/settle`, {
      method: "POST",
    });
  }

  submit(orderId: string, skipAvailabilityChecks: boolean) {
    return this.#trybe.fetch<Order>(`/shop/orders/${orderId}/submit`, {
      params: { skip_availability_checks: skipAvailabilityChecks },
      method: "POST",
    });
  }

  email(orderId: string, type: "BasketConfirmed") {
    return this.#trybe.fetch(`/shop/orders/${orderId}/emails`, {
      body: { type },
      method: "POST",
    });
  }
}

class OrderBuilder {
  orderEngine;
  data;
  constructor(orderEngine: Trybe["orders"], order: Order) {
    this.orderEngine = orderEngine;
    this.data = order;
  }
  async addItem(item: OrderItem, skipChecks = true) {
    await this.orderEngine.addItem(this.data.id, item, skipChecks);
    return this.data;
  }
  async submit() {
    this.data = await this.orderEngine.submit(this.data.id, true);
    console.log("data", this.data);
    return this.data;
  }
  sendConfirmation() {
    return this.orderEngine.email(this.data.id, "BasketConfirmed");
  }
}
