import { DateTime } from "luxon";

export class Date {
  readonly raw: string;
  readonly parsed: DateTime<true>;

  constructor(raw: string) {
    this.raw = raw;
    const parsed = DateTime.fromISO(raw);
    if (!parsed.isValid) {
      throw new Error(`Invalid date string: ${raw}`);
    }
    this.parsed = parsed;
  }

  format(): string {
    if (this.raw.length === 4) return this.raw;
    if (this.raw.length === 7) return this.parsed.toFormat("LLL yyyy");
    return this.parsed.toFormat("LLL d, yyyy");
  }

  preposition(): "in" | "on" {
    return this.raw.length === 10 ? "on" : "in";
  }
}

export type PlaceId = string;

export type ReformStatus =
  | "implemented"
  | "passed"
  | "planned"
  | "proposed"
  | "repealed";

export interface Place {
  // Full name of the town, city, county, province, state, or country.
  name: string;
  // State or province abbreviation. Not set for countries.
  state: string | null;
  country: string;
  pop: number;
  // [long, lat]
  coord: [number, number];
  repeal: boolean;
}

export type PolicyType =
  | "reduce parking minimums"
  | "remove parking minimums"
  | "add parking maximums";

/// Every policy has these values, new-style and legacy. This is missing some fields like `date`.
export interface BasePolicy {
  summary: string;
  status: ReformStatus;
  scope: string[];
  land: string[];
}

/// Coercing new-style policies & legacy policies into the same type to simplify the web app.
/// Still missing certain values like `date`.
export type BaseUnifiedPolicy = BasePolicy & { policy: PolicyType[] };

/// Like BasePolicy, but with unprocessed values added.
export type RawPolicy = BasePolicy & { date: string | null };

/// An entry from data/core.json that's not yet processed.
export interface RawCoreEntry {
  place: Place;
  legacy?: BaseUnifiedPolicy & { date: string | null };
  reduce_min?: RawPolicy[];
  rm_min?: RawPolicy[];
  add_max?: RawPolicy[];
}

/// A fully processed data/core.json entry.
export interface ProcessedCoreEntry {
  place: Place & { url: string };
  unifiedPolicy: BaseUnifiedPolicy & { date: Date | null };
}
