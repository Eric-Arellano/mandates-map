export type CityId = string;

export interface CityEntry {
  city: string;
  state: string;
  country: string;
  report_summary: string;
  report_status: string;
  report_type: string;
  report_magnitude: string;
  land_uses: string;
  reporter_name: string;
  date_of_reform: string;
  last_updated: string;
  is_verified: string;
  is_magnitude_regional: string;
  is_magnitude_citywide: string;
  is_magnitude_citycenter: string;
  is_magnitude_transit: string;
  is_magnitude_mainstreet: string;
  is_type_eliminated: string;
  is_type_reduced: string;
  is_type_maximums: string;
  is_uses_alluses: string;
  is_uses_residential: string;
  is_uses_commercial: string;
  is_uses_lowdensity: string;
  is_uses_multifamily: string;
  is_no_mandate_city: string;
  population: string;
  is_notable: string;
  is_recent: string;
  citation_url: string;
  lat: string;
  long: string;
  id: string;
  magnitude_encoded: string;
  border_encoded: string;
  land_use_encoded: string;
  population_encoded: string;
  city_search: string;
  is_special: string;
}

export class PopulationSliders {
  readonly controls: HTMLDivElement;
  readonly left: HTMLInputElement;
  readonly right: HTMLInputElement;

  constructor(
    controls: HTMLDivElement,
    left: HTMLInputElement,
    right: HTMLInputElement
  ) {
    this.controls = controls;
    this.left = left;
    this.right = right;
  }

  /** Return the [leftIndex, rightIndex] of the sliders. */
  getCurrentIndexes(): [number, number] {
    return [
      Math.floor(parseFloat(this.left.value)),
      Math.ceil(parseFloat(this.right.value)),
    ];
  }
}
