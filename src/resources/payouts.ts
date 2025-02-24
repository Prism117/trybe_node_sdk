import type Trybe from "../index.js";

export default class Payouts {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  /**
   * Get simple list of payouts
   * {@link https://openapi.try.be/#operation/payoutsIndex|View Docs}
   * @param query
   */
  find(query?: PayoutQuery) {
    return this.#trybe.fetch<PayoutReturn[]>("/shop/reports/payouts", {
      params: { ...query, site_id: this.#trybe.siteId },
    });
  }

  findOne(payoutId: string) {
    return this.#trybe.fetch<PayoutDetail>(`/shop/reports/payouts/${payoutId}`);
  }

  /**
   * Appends Details to multiple payouts
   * @param query
   * @returns
   */
  async findDetail(query?: PayoutQuery) {
    const payouts: MultiDetails[] = await this.find(query);
    for (const payout of payouts) {
      const details = await this.findOne(payout.id);
      payout.details = details;
    }
    return payouts;
  }
}

interface PayoutQuery {
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
}

interface PayoutReturn {
  id: string;
  status: string;
  payout_date: string;
  processed_at: string;
  num_charges: number;
  gross_fee_total: number;
  amount: number;
  currency: string;
  site_id: string;
}

interface MultiDetails extends PayoutReturn {
  details?: PayoutDetail;
}

interface Totals {
  count: number;
  gross: number;
  fees: number;
  net: number;
}

interface Charges {
  id: string;
  type: string;
  description: string;
  gross_amount: number;
  fee_amount: number;
  net_amount: number;
  completed_at: string;
  payable_id: string;
  payable_type: string;
  order_ref: string;
}

interface PayoutDetail {
  id: string;
  status: string;
  processor: string;
  charges: Charges[];
  payment_totals: Totals;
  refund_totals: Totals;
  amount: number;
  currency: string;
  payout_date: string;
}
