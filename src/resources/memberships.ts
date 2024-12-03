import type Trybe from "../index.js";
import {
  CreateMemberResponse,
  type CreateCustomerBody,
  type CreateMembershipBody,
  type MembershipQuery,
  type MembershipRateResponse,
  type MembershipType,
} from "../types.js";

type MembershipStatus =
  | "active"
  | "needs_attention"
  | "cancelled"
  | "upcoming"
  | "expired";

interface MemberQuery {
  status?: MembershipStatus[] | string;
  page?: number;
  per_page?: number;
  rate_id?: string;
  membership_type_ids?: string;
  billing_frequency?: "P1M" | "P3M" | "P6M" | "P1Y";
  created_at_from?: string;
  created_at_to?: string;
  end_date_from?: string;
  end_date_to?: string;
  next_billing_date_from?: string;
  next_billing_date_to?: string;
}

export default class Memberships {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getMembers(query?: MemberQuery) {
    if (query?.status && Array.isArray(query.status)) {
      query.status = query.status.join(",");
    }
    return this.#trybe.fetch("/customers/memberships", {
      params: query,
    });
  }

  getCreditTypes(query?: { membership_type_id?: string }) {
    return this.#trybe.fetch("/customers/membership-credit-rules", {
      params: query,
    });
  }

  addPayment(membershipId: string, processorId: string) {
    return this.#trybe.fetch(
      `/customers/memberships/${membershipId}/add-payment`,
      { method: "POST", body: { processor_type_id: processorId } }
    );
  }

  confirm(membershipId: string) {
    return this.#trybe.fetch(`/customers/memberships/${membershipId}/confirm`, {
      method: "POST",
    });
  }

  addToCustomer(body: CreateMembershipBody) {
    return this.#trybe.fetch<CreateMemberResponse>("/shop/memberships", {
      body: { ...body, site_id: this.#trybe.siteId },
      method: "POST",
    });
  }

  /**
   * Creates new membership & customer (if applicable)
   */

  create(customerData: CreateCustomerBody, membership: CreateCustomerBody) {
    return this.#trybe.fetch("/customers/memberships", {
      method: "POST",
      body: { ...membership, customer_data: customerData },
    });
  }

  getTypes(query?: MembershipQuery) {
    return this.#trybe.fetch<MembershipType[]>("/customers/membership-types", {
      params: query,
    });
  }

  getRates(query?: {
    per_page?: number;
    page?: number;
    membership_type_id?: string;
    archive?: boolean;
  }) {
    return this.#trybe.fetch<MembershipRateResponse["data"]>(
      "/customers/membership-rates",
      {
        params: query,
      }
    );
  }

  sendBillMandate(membershipId: string) {
    const endpoint = `/customers/memberships/${membershipId}/request-mandate`;
    return this.#trybe.fetch(endpoint, { method: "POST" });
  }

  confirmMembership(membershipId: string) {
    const endpoint = `/customers/memberships/${membershipId}/confirm`;
    return this.#trybe.fetch(endpoint, { method: "POST" });
  }

  //
  // async collectDD(membershipId: string) {
  //   const endpoint = `/customers/memberships/${membershipId}/checkout-session/direct-debit`;
  //   const res = await this.#trybe.fetch(endpoint, { method: "POST" });
  //   return res;
  // }
}
