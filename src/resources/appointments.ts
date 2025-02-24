import Trybe from "../index.js";
import { AppointmentType } from "../types/appointments.js";

export default class Appointments {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getTypes(query?: { page?: number; per_page?: number; archived?: boolean }) {
    return this.#trybe.fetch<AppointmentType[]>("/shop/appointment-types", {
      params: query,
    });
  }

  getTags(orgId: string) {
    return this.#trybe.fetch("/shop/shop/appointment-tags", {
      params: { organisation_id: orgId },
    });
  }

  addTag(tag: { name: string; organisation_id: string }) {
    return this.#trybe.fetch(
      `/shop/organisations/${tag.organisation_id}/appointment-tags`,
      { method: "POST", body: tag }
    );
  }
}
