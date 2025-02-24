import Trybe from "../index.js";
import { GetPackageRes } from "../types/packages.js";

export default class Packages {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getAll(query?: { page?: number; per_page?: number; archived?: boolean }) {
    return this.#trybe.fetch<GetPackageRes[]>("/shop/packages", {
      params: query,
    });
  }
}
