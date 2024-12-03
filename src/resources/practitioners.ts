import type Trybe from "../index.js";

export default class Practitioners {
  #trybe;
  constructor(trybe: Trybe) {
    this.#trybe = trybe;
  }

  getAll(query?: { page?: number; per_page?: number; query?: string }) {
    return this.#trybe.fetch<Practitioner[]>("/shop/practitioners", {
      params: { ...query, site_id: this.#trybe.siteId },
    });
  }

  update(practitionerId: string, updates: Partial<Practitioner>) {
    return this.#trybe.fetch(`/shop/practitioners/${practitionerId}`, {
      method: "PUT",
      body: updates,
    });
  }

  addRecurringRota(data: RotaBody) {
    return this.#trybe.fetch("/shop/practitioner-rotas", {
      method: "POST",
      body: data,
    });
  }
  
  getRecurringRotas(query?: { practitioner_id?: string }) {
    return this.#trybe.fetch<Array<RotaBody & { id: string }>>(
      "/shop/practitioner-rotas",
      {
        params: query,
      }
    );
  }

  updateRecurringRota(rotaId: string, updates: Partial<RotaBody>) {
    return this.#trybe.fetch(`/shop/practitioner-rotas/${rotaId}`, {
      method: "PUT",
      body: { ...updates, id: rotaId },
    });
  }

  deleteRecurringRota(rotaId: string) {
    return this.#trybe.fetch(`/shop/practitioner-rotas/${rotaId}`, {
      method: "DELETE",
    });
  }

}

export interface Practitioner {
  id: string;
  name: string;
  avatar_id: string;
  site_ids: string[];
  avatar: {
    id: string;
    file_name: string;
    mime_type: string;
    size: number;
    url: string;
  };
  tag_ids: string[];
  tags: Array<{ id?: string; name?: string; organisation_id?: string }>;
  zones: Array<{
    id: string;
    name?: string;
    site_id?: string;
    organisation_id?: string;
  }>;
  zone_ids: string[];
  can_offer_tags: string[];
  appointment_restrictions: Array<{
    id: string;
    type: "cannot_offer" | "max_duration";
    applies_to_type: "specific" | "categories";
    appointment_type_ids: string[];
    appointment_types: Array<{ id: string; name?: string }>;
    category_ids: string[];
    categories: Array<{ id: string; name?: string; organisation_id?: string }>;
    date_from: string;
    date_to: string;
    max_duration?: string;
  }>;
  scheduling_week_interval_start: number;
  scheduling_week_interval: number;
  created_at: string;
  updated_at: string;
}

interface RotaBody {
  start_date: string;
  end_date?: string;
  practitioner_id: string;
  scheduling_week_interval: number;
  availability_rules: Array<{
    weekday: Weekday;
    time_from: string;
    time_to: string;
    week_num: number;
  }>;
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
