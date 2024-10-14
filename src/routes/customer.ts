import { AxiosError } from "axios";
import type {
  Fetcher,
  CustomerResponse,
  CreateCustomerBody,
} from "../types.js";

export default class Customer {
  #fetcher;
  siteId;
  constructor(fetcher: Fetcher, siteId: string) {
    this.#fetcher = fetcher;
    this.siteId = siteId;
  }
  async create(
    body: Omit<CreateCustomerBody, "site_id">
  ): Promise<CustomerResponse> {
    const endpoint = "/customers/customers";
    try {
      const response = await this.#fetcher(endpoint, {
        method: "POST",
        body: { ...body, site_id: this.siteId },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }
}
