import { AxiosError } from "axios";
import type {
  Fetcher,
  CustomerResponse,
  CreateCustomerBody,
  CustomerQuery,
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

  async getAll(query?: CustomerQuery) {
    const endpoint = "/customers/customers";
    try {
      const response: { data: CustomerResponse[] } = await this.#fetcher(
        endpoint,
        { params: query }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async resetPassword(customerId: string) {
    const endpoint = `/customers/customers/${customerId}/reset-password`;
    try {
      const response: { data: CustomerResponse } = await this.#fetcher(
        endpoint,
        { method: "POST" }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data);
      }
      throw error;
    }
  }

  async generatePasswordURL(customerId: string) {
    const endpoint = `/customers/customers/${customerId}/set-password-url`;
    try {
      const response: { data: { token: string; url: string } } =
        await this.#fetcher(endpoint, { method: "POST" });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data?.message);
      }
      throw error;
    }
  }

  async resendVerification(customerId: string) {
    const endpoint = `/customers/customers/${customerId}/resend-verification`;
    try {
      const response: { data: CustomerResponse } = await this.#fetcher(
        endpoint,
        { method: "POST" }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error?.response?.data?.message);
      }
      throw error;
    }
  }
}
