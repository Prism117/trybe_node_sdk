import type Trybe from "../index.js";

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
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getAll(query?: PaymentQuery) {
    const endpoint = "/customers/payment-methods";

    return this.#trybe.fetch(endpoint, {
      params: query,
    });
  }
}
