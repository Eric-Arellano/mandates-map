import { expect, test } from "@playwright/test";

import { escapePlaceId, placeIdToUrl } from "../../src/js/data";

test("escapePlaceID", () => {
  expect(escapePlaceId("Tucson, AZ")).toEqual("Tucson_AZ");
  expect(escapePlaceId("St. Lucia, AZ")).toEqual("St.Lucia_AZ");
});

test("placeIdToUrl", () => {
  expect(placeIdToUrl("Tucson, AZ")).toEqual(
    "https://parkingreform.org/mandates-map/city_detail/Tucson_AZ.html",
  );
});