import type Trybe from "../index.js";

interface PaymentMethodQuery {
  customer_id?: string;
  type?: string;
  processor?: string;
  status?: string;
  membership_payment_method?: string;
  per_page?: number;
  page?: number;
}

interface PaymentQuery {
  completed_from?: string;
  completed_to?: string;
  revenue_date_from?: string;
  revenue_date_to?: string;
  payout_date_from?: string;
  payout_date_to?: string;
  site_id?: string;
  chargeable_type?: "refund" | "payment";
  charge_type?: "refund" | "payment";
  processor?:
    | "manaual"
    | "stripe"
    | "adyen"
    | "saved_card"
    | "pms_folio"
    | "voucher"
    | "external_voucher";
  processor_type_id?: string;
  order_status?: "in_progress" | "new" | "settled" | "cancelled" | "no_show";
  page?: number;
  per_page?: number;
}

export default class Payments {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getMethods(query?: PaymentMethodQuery) {
    const endpoint = "/customers/payment-methods";

    return this.#trybe.fetch(endpoint, {
      params: query,
    });
  }

  find(query?: PaymentQuery) {
    return this.#trybe.fetch<PaymentReturn[]>("/shop/reports/charge-list", {
      params: query,
    });
  }

  findOne(query?: SinglePaymentQuery) {
    return this.#trybe.fetch<PaymentReturn[]>("/shop/reports/day-charges", {
      params: { ...query, site_id: this.#trybe.siteId },
    });
  }
}

interface SinglePaymentQuery {
  date?: string;
  status?: string;
  page?: number;
}

export interface PaymentReturn {
  id: string;
  charge_type: string;
  order_ref: string;
  order_status: string;
  chargeable_id: string;
  chargeable_type: string;
  customer_name: string;
  customer_id: string;
  processor: string;
  processor_type_id: string;
  processor_type: string;
  processor_id: string;
  amount: number;
  currency: string;
  status: string;
  failure_reason: string;
  cardholder_name: string;
  card_brand: string;
  card_last4: string;
  revenue_date: string;
  payout_date: string;
  created_at: string;
  completed_at: string;
}

export interface ProcessorTotal {
  processor: string;
  payment_count: number;
  refund_count: number;
  payment_total: number;
  refund_total: number;
  types: Type[];
}

export interface Type {
  type: string;
  payment_count: number;
  refund_count: number;
  payment_total: number;
  refund_total: number;
}
