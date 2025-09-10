/**
 * @license MIT
 * @fileoverview Manages all API related aspects of the app
 * @copyright Dhrubajyoti Bhattacharjee 2024, All Rights Reserved
 * @author Dhrubajyoti Bhattacharjee <dhrubajyotibhattacharjee182@gmail.com>
 */

"use strict";

// Uses our Vercel serverless functions instead of direct API calls
// keeping the API key secure on the server side and prevents CORS issues

/**
 * Fetches data from our serverless functions
 * @param {string} url API URL (pointing to our Vercel serverless functions)
 * @param {Function} callback callback function
 */
export function fetchWeatherData(url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      // better error handling
      callback(null);
    });
}

// Updated all URL functions to point to our Vercel serverless functions
export const url = {
  getCurrentWeather(lat, lon) {
    return `/api/current-weather?lat=${lat}&lon=${lon}`;
  },

  getHourlyForecast(lat, lon) {
    return `/api/forecast?lat=${lat}&lon=${lon}`;
  },

  getAirPollutionData(lat, lon) {
    return `/api/air-pollution?lat=${lat}&lon=${lon}`;
  },

  /**
   * @param {string} query Query, e.g., "london", "Paphos", etc.
   */
  getGeocoding(query) {
    // Points to our geocoding API endpoint
    return `/api/geocoding?q=${encodeURIComponent(query)}`;
  },

  undoGeocoding(lat, lon) {
    return `/api/reverse-geocoding?lat=${lat}&lon=${lon}`;
  },
};
