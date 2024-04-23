/**
 * @license MIT
 * @fileoverview Manages the routing system of the app
 * @copyright Dhrubajyoti Bhattacharjee 2024, All Rights Reserved
 * @author Dhrubajyoti Bhattacharjee <dhrubajyotibhattacharjee182@gmail.com>
 */

"use strict";

import { updateWeather, handleError404 } from "./main.js";

const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"; // London

const getCurrentLocation = () => {
  window.navigator.geolocation.getCurrentPosition(
    (result) => {
      const { latitude, longitude } = result.coords;

      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    },

    (error) => {
      window.location.hash = defaultLocation;
    }
  );
};

/**
 * @param {string} query Searched query
 */
const getSearchedLocation = (query) => updateWeather(...query.split("&"));

const routes = new Map([
  ["/current-location", getCurrentLocation],
  ["/weather", getSearchedLocation],
]);

const onHashChange = () => {
  const requestedURL = window.location.hash.slice(1);

  const [route, query] = requestedURL.includes("?") // IS IT CORRECT???
    ? requestedURL.split("?")
    : [requestedURL];

  routes.get(route) ? routes.get(route)(query) : handleError404();
};

window.addEventListener("hashchange", onHashChange);

window.addEventListener("load", () => {
  if (!window.location.hash) window.location.hash = "#/current-location";
  else onHashChange();
});
