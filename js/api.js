/**
 * @license MIT
 * @fileoverview Manages all API related aspects of the app
 * @copyright Dhrubajyoti Bhattacharjee 2024, All Rights Reserved
 * @author Dhrubajyoti Bhattacharjee <dhrubajyotibhattacharjee182@gmail.com>
 */

"use strict";

const API_KEY = "8a4dc3f95755553bb04f259e3aadc7cf";

/**
 * Fetches data from the server
 * @param {string} url API URL
 * @param {Function} callback callback function
 */

export function fetchWeatherData(url, callback) {
  fetch(`${url}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => callback(data));
}

export const url = {
  getCurrentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },

  getHourlyForecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },

  getAirPollutionData(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },

  /**
   * @param {string} query Query, e.g., "london", "Paphos", etc.
   */
  getGeocoding(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },

  undoGeocoding(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },
};
