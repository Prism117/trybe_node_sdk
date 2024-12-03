import Trybe from "../index.js";

export default class Products {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getInventory(query?: any) {
    return this.#trybe.fetch("/inventory/products", {
      params: { site_id: this.#trybe.siteId, ...query },
    });
  }

  getAll(query?: any) {
    return this.#trybe.fetch("/shop/products", {
      params: query,
    });
  }

  update(productId: string, data: { barcode: string }) {
    return this.#trybe.fetch(`/shop/products/${productId}`, {
      body: data,
      method: "PUT",
    });
  }

  add(product: Partial<CreateProduct>) {
    return this.#trybe.fetch("/shop/products", {
      method: "POST",
      body: product,
    });
  }

  addInventoryProduct(product: Partial<CreateInvProduct>) {
    return this.#trybe.fetch<CreateInvProduct>("/inventory/products", {
      method: "POST",
      body: product,
    });
  }

  addPriceRule(rule: {
    id?: string;
    product_id: string;
    date_from?: string;
    date_to?: string;
    price: number;
  }) {
    return this.#trybe.fetch(`shop/products/${rule.product_id}/price_rules`, {
      method: "POST",
      body: rule,
    });
  }
}

interface Image {
  id: string;
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
}

interface Tag {
  id: string;
  name: string;
  organisation_id: string;
}

type Category = Tag;

interface PriceRule {
  id?: string;
  product_id?: string;
  date_from: string;
  date_to?: string;
  price: number;
}

export interface CreateProduct {
  id: string;
  name: string;
  description: string;
  product_code: string;
  barcode: string;
  currency: string;
  image: Image;
  offered_online: boolean;
  private: boolean;
  members_only: boolean;
  permitted_membership_type_ids: string[];
  tag_ids: string[];
  tags: Tag[];
  category_ids: string[];
  categories: Category[];
  site_id: string;
  inventory_product_id: string;
  price_rules: PriceRule[];
  revenue_centre: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateInvProduct {
  id: string;
  name: string;
  description: string;
  barcode: string;
  currency: string;
  sku: string;
  reorder_level: number;
  brand_id: string;
  category_id: string;
  organisation_id: string;
  site_id: string;
  average_cost: number;
  stock_value: number;
  stock_level: number;
}
