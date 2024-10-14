import { AxiosError } from "axios";
import type {
  CreateMembershipBody,
  Fetcher,
  MembershipQuery,
  MembershipRateResponse,
  MembershipTypeResponse,
} from "../types.js";

export default class Memberships {
  #fetcher;
  siteId;
  constructor(fetcher: Fetcher, siteId: string) {
    this.#fetcher = fetcher;
    this.siteId = siteId;
  }

  async addToCustomer(body: CreateMembershipBody) {
    const endpoint = "/shop/memberships";
    try {
      const data = await this.#fetcher(endpoint, {
        body: { ...body, site_id: this.siteId },
        method: "POST",
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async getTypes(query: MembershipQuery): Promise<MembershipTypeResponse> {
    const endpoint = "/customers/membership-types";
    try {
      const data = await this.#fetcher(endpoint, { params: query });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async getRates(query: {
    per_page?: number;
    page?: number;
    membership_type_id?: string;
    archive?: boolean;
  }) {
    const endpoint = "/customers/membership-rates";
    try {
      const data: MembershipRateResponse = await this.#fetcher(endpoint, {
        params: query,
      });
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async sendBillMandate(membershipId: string) {
    const endpoint = `/customers/memberships/${membershipId}/request-mandate`;
    try {
      const res = await this.#fetcher(endpoint, { method: "POST" });
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }
}
