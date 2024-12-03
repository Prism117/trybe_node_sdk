import type {
  Customer as CustomerType,
  CreateCustomerBody,
  CustomerQuery,
  CustomerCredit,
} from "../types/customers.js";
import Trybe from "../index.js";

export default class Customer {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  create(body: Omit<CreateCustomerBody, "site_id">) {
    const endpoint = "/customers/customers";
    return this.#trybe.fetch<CustomerType>(endpoint, {
      method: "POST",
      body: { ...body, site_id: this.#trybe.siteId },
    });
  }

  getAll(query?: CustomerQuery) {
    const endpoint = "/customers/customers";
    return this.#trybe.fetch<CustomerType[]>(endpoint, {
      params: query,
    });
  }

  attachLabels(customerId: string, labels: string[]) {
    const endpoint = `/customers/customers/${customerId}/labels`;
    return this.#trybe.fetch(endpoint, {
      body: { labels },
      method: "POST",
    });
  }

  getIntakeForms(customerId: string) {
    return this.#trybe.fetch("/shop/visit-intake-forms", {
      params: { customer_id: customerId, site_id: this.#trybe.siteId },
    });
  }

  // * === EMAIL === *

  /**
   * Send Password Reset Email
   */

  resetPassword(customerId: string) {
    const endpoint = `/customers/customers/${customerId}/reset-password`;
    return this.#trybe.fetch<CustomerType>(endpoint, {
      method: "POST",
    });
  }

  async resendVerification(customerId: string) {
    const endpoint = `/customers/customers/${customerId}/resend-verification`;
    return this.#trybe.fetch<Customer>(endpoint, {
      method: "POST",
    });
  }

  generatePasswordURL(customerId: string) {
    const endpoint = `/customers/customers/${customerId}/set-password-url`;
    return this.#trybe.fetch<{ token: string; url: string }>(endpoint, {
      method: "POST",
    });
  }

  //* === CREDITS === *

  getCredits(
    customerId: string,
    query?: { redeemed?: boolean; expired?: boolean; revoked?: boolean }
  ) {
    return this.#trybe.fetch<CustomerCredit[]>(
      `/customers/customers/${customerId}/credits`,
      {
        params: query,
      }
    );
  }

  revokeCredit(customerId: string, creditId: string) {
    const endpoint = `/customers/customers/${customerId}/credits/${creditId}`;
    return this.#trybe.fetch(endpoint, { method: "DELETE" });
  }

  issueCredits(membershipId: string) {
    const endpoint = `/customers/memberships/${membershipId}/issue-credits`;
    return this.#trybe.fetch(endpoint, { method: "POST" });
  }

  issueCredit(customerId: string, couponBody: CouponBody) {
    const endpoint = `/customers/customers/${customerId}/credits`;
    const body = {
      ...couponBody,
      site_id: this.#trybe.siteId,
      customer_id: customerId,
    };
    return this.#trybe.fetch(endpoint, { method: "POST", body });
  }
}

interface CouponBody {
  coupon: {
    value: string;
    name: string;
    description: string;
  };
  coupon_id: string;
  expiry_date?: string;
}
