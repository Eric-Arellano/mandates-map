/* global document */

import type { FeatureGroup } from "leaflet";
import type { CityEntry, CityId } from "./types";

const setUpDetails = (
  markerGroup: FeatureGroup,
  data: Record<CityId, CityEntry>
): void => {
  const cityDetailsElement = document.querySelector(
    ".city-details-popup"
  ) as HTMLElement;

  // Clicking any city marker, updates HTML and makes popup visible
  markerGroup.on("click", (e) => {
    const cityState = e.sourceTarget.getTooltip().getContent();
    const cityInfo = createCityDetailsText(data, cityState);
    document.querySelector(".city-details-text").innerHTML = cityInfo;
    cityDetailsElement.style.display = "block";
  });
  // closes window on clicks outside the info popup
  window.addEventListener("click", (event) => {
    if (
      event.target instanceof Node &&
      !(event.target instanceof SVGPathElement) &&
      cityDetailsElement.style.display === "block" &&
      !cityDetailsElement.contains(event.target)
    ) {
      cityDetailsElement.style.display = "none";
    }
  });

  // Note that the close element will only render when the about text popup is rendered.
  // So, it only ever makes sense for a click to close.
  document
    .querySelector(".city-details-popup-close-icon")
    .addEventListener("click", () => {
      cityDetailsElement.style.display = "none";
    });
};

const createCityDetailsText = (
  data: Record<CityId, CityEntry>,
  cityState: CityId
): string => {
  const cityData = data[cityState];
  return `<h2><a href="${
    cityData["citation_url"]
  }" target="_blank">${cityState}</h2>
    <p>Detailed Information and Citations</p></a>
    <p>${cityData["report_summary"]}</p>
    <p>Population: ${parseInt(cityData["population"]).toLocaleString()}</p>
    <p>Type of Reform: ${cityData["report_type"]}</p>
    <p>Reform Status: ${cityData["report_status"]}</p>
    <p>Scope of Reform: ${cityData["report_magnitude"]}</p>
    <p>Land Uses: ${cityData["land_uses"]}</p>
    `;
};

export default setUpDetails;
