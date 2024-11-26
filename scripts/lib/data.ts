import fs from "fs/promises";

import {
  RawCoreEntry,
  ProcessedCoreEntry,
  RawPolicy,
  PlaceId,
  Place,
  BaseUnifiedPolicy,
} from "../../src/js/types";

export interface Attachment {
  fileName: string;
  directusId: string;
  isDoc: boolean;
}

export type CitationType = "city code" | "media report" | "other";

export interface Citation {
  description: string;
  type: CitationType;
  url: string | null;
  notes: string | null;
  attachments: Attachment[];
}

export interface ExtendedPolicy {
  reporter: string | null;
  requirements: string[];
  citations: Citation[];
}

export interface RawExtendedEntry {
  legacy?: ExtendedPolicy;
  reduce_min?: ExtendedPolicy[];
  rm_min?: ExtendedPolicy[];
  add_max?: ExtendedPolicy[];
}

export interface RawCompleteEntry {
  place: Place;
  legacy?: BaseUnifiedPolicy & { date: string | null } & ExtendedPolicy;
  reduce_min?: Array<RawPolicy & ExtendedPolicy>;
  rm_min?: Array<RawPolicy & ExtendedPolicy>;
  add_max?: Array<RawPolicy & ExtendedPolicy>;
};

export interface ProcessedExtendedEntry {
  unifiedPolicy: ExtendedPolicy;
}
export type ProcessedCompleteEntry = ProcessedCoreEntry &
  ProcessedExtendedEntry;

export async function readRawCoreData(): Promise<
  Record<PlaceId, RawCoreEntry>
> {
  const raw = await fs.readFile("data/core.json", "utf8");
  return JSON.parse(raw);
}

export async function readRawExtendedData(): Promise<
  Record<PlaceId, RawExtendedEntry>
> {
  const raw = await fs.readFile("data/extended.json", "utf8");
  return JSON.parse(raw);
}

export async function readRawCompleteData(): Promise<
  Record<PlaceId, RawCompleteEntry>
> {
  const [coreData, extendedData] = await Promise.all([
    readRawCoreData(),
    readRawExtendedData(),
  ]);
  return Object.fromEntries(
    Object.entries(coreData).map(([placeId, core]) => [
      placeId,
      {
        place: core.place,
        legacy: { ...core.legacy, ...extendedData[placeId].legacy },
      },
    ]),
  );
}
