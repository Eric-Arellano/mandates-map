import fs from "fs/promises";

import { RawEntry, PlaceId } from "../../src/js/types";

export type Attachment = {
  fileName: string;
  isDoc: boolean;
  outputPath: string;
};

export type Citation = {
  description: string;
  type: string;
  url: string;
  notes: string;
  attachments: Attachment[];
};

export type ExtendedEntry = {
  reporter: string | null;
  requirements: string[];
  citations: Citation[];
};

export type CompleteEntry = RawEntry & ExtendedEntry;

export function escapePlaceId(v: string): string {
  return v.replace(/ /g, "").replace(",", "_");
}

export async function readCoreData(): Promise<Record<PlaceId, RawEntry>> {
  const raw = await fs.readFile("data/core.json", "utf8");
  return JSON.parse(raw);
}

export async function readExtendedData(): Promise<
  Record<PlaceId, ExtendedEntry>
> {
  const raw = await fs.readFile("data/extended.json", "utf8");
  return JSON.parse(raw);
}

export async function readCompleteData(): Promise<
  Record<PlaceId, CompleteEntry>
> {
  const [coreData, extendedData] = await Promise.all([
    readCoreData(),
    readExtendedData(),
  ]);

  if (Object.keys(coreData).length !== Object.keys(extendedData).length) {
    // TODO: convert to error
    console.warn("core.json and extended.json have unequal # of entries");
  }

  return Object.fromEntries(
    Object.entries(coreData).map(([placeId, core]) => [
      placeId,
      { ...core, ...extendedData[placeId] },
    ]),
  );
}