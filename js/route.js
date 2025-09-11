/**
 * @license MIT
 * @fileoverview Manages the routing system of the app
 * @copyright Dhrubajyoti Bhattacharjee 2024, All Rights Reserved
 * @author Dhrubajyoti Bhattacharjee <dhrubajyotibhattacharjee182@gmail.com>
 */

"use strict";

import {
  updateWeather,
  handleError404,
  showPlaceholderContent,
} from "./main.js";

const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"; // London

const getCurrentLocation = () => {
  // show placeholder while waiting for location permission
  showPlaceholderContent();

  // clear search field when getting current location
  const searchFieldEl = document.querySelector("[data-search-field]");

  if (searchFieldEl) {
    searchFieldEl.value = "";
  }

  window.navigator.geolocation.getCurrentPosition(
    (result) => {
      const { latitude, longitude } = result.coords;

      updateWeather(latitude, longitude);
    },

    (error) => {
      console.error("Geolocation error:", error);
      if (error.code === error.PERMISSION_DENIED) {
        // user denied location access
        showPlaceholderContent();
      } else {
        // other errors, fallback to default location
        window.location.hash = defaultLocation;
      }
    },
    {
      // options for better geolocation experience
      timeout: 10000,
      maximumAge: 180000, // 3 mins
    }
  );
};

/**
 * @param {string} query Searched query
 */
const getSearchedLocation = (query) => {
  const params = new URLSearchParams(query);
  const lat = params.get("lat");
  const lon = params.get("lon");

  if (lat && lon) {
    updateWeather(parseFloat(lat), parseFloat(lon));
  } else {
    handleError404();
  }
};

const routes = new Map([
  ["/current-location", getCurrentLocation],
  ["/weather", getSearchedLocation],
]);

const onHashChange = () => {
  const requestedURL = window.location.hash.slice(1);

  const [route, query] = requestedURL.includes("?")
    ? requestedURL.split("?")
    : [requestedURL, null];

  const routeHandler = routes.get(route);
  if (routeHandler) {
    routeHandler(query);
  } else {
    handleError404();
  }
};

window.addEventListener("hashchange", onHashChange);

window.addEventListener("load", () => {
  if (!window.location.hash) {
    // placeholder content immediately on first load
    showPlaceholderContent();
    window.location.hash = "#/current-location";
  } else {
    onHashChange();
  }
});
