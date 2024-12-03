import Trybe from "../index.js";

export default class Appointments {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getTypes() {
    return this.#trybe.fetch("/shop/appointment-types");
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
