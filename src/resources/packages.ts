import Trybe from "../index.js";

export default class Packages {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  async getAll() {
    try {
      const response = await this.#trybe.fetch("/shop/packages");
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
