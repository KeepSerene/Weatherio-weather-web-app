/**
 * @license MIT
 * @copyright Dhrubajyoti Bhattacharjee 2024, All Rights Reserved
 * @author Dhrubajyoti Bhattacharjee <dhrubajyotibhattacharjee182@gmail.com>
 */

"use strict";

import { fetchWeatherData, url } from "./api.js";
import * as module from "./module.js";

/**
 * @param {NodeList} elements elements node array
 * @param {string} eventType event's type, e.g., "click"
 * @param {Function} callback event handler function
 */
const addEventListenersToEls = (elements, eventType, callback) => {
  for (let element of elements) element.addEventListener(eventType, callback);
};

// Toggle the search bar on mobile devices
const searchViewEl = document.querySelector("[data-search-view]");
const searchBarTogglerEls = document.querySelectorAll(
  "[data-search-bar-toggler]"
);

const toggleSearchBar = () => searchViewEl.classList.toggle("active");

addEventListenersToEls(searchBarTogglerEls, "click", toggleSearchBar);

// Search API integration
const searchFieldEl = searchViewEl.querySelector("[data-search-field]");
const searchResultsEl = searchViewEl.querySelector("[data-search-results]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchFieldEl.addEventListener("input", () => {
  searchTimeout ?? clearTimeout(searchTimeout);

  if (!searchFieldEl.value) {
    searchResultsEl.classList.remove("active");
    searchResultsEl.innerHTML = "";
    searchFieldEl.classList.remove("searching");
  } else {
    searchFieldEl.classList.add("searching");
  }

  if (searchFieldEl.value) {
    searchTimeout = setTimeout(() => {
      fetchWeatherData(
        url.getGeocoding(searchFieldEl.value),

        (locations) => {
          searchFieldEl.classList.remove("searching");
          searchResultsEl.classList.add("active");

          searchResultsEl.innerHTML = `
            <ul class="search-list" data-search-list></ul>
        `;

          const /** {NodeList} | [] */ items = [];

          for (let { name, lat, lon, country, state } of locations) {
            const searchItem = document.createElement("li");
            searchItem.classList.add("search-item");

            searchItem.innerHTML = `
              <i class="msr-icon">location_on</i>

              <div>
                <p class="item-title">${name}</p>
                <p class="item-subtitle label-2">${state || ""} ${country}</p>
              </div>

              <a
                href="#/weather?lat=${lat}&lon=${lon}"
                class="item-link has-state"
                aria-label="Weather in ${name}"
                data-search-bar-toggler
              ></a>
            `;

            searchResultsEl
              .querySelector("[data-search-list]")
              .appendChild(searchItem);

            items.push(searchItem.querySelector("[data-search-bar-toggler]"));
          }

          addEventListenersToEls(items, "click", () => {
            toggleSearchBar();
            searchResultsEl.classList.remove("active");
          });
        }
      );
    }, searchTimeoutDuration);
  }
});

const currentLocationBtn = document.querySelector(
  "[data-current-location-btn]"
);
const wrapperEl = document.querySelector("[data-wrapper]");
const loadingScreenEl = document.querySelector("[data-loading-screen]");
const erroneousContentEl = document.querySelector("[data-erroneous-content]");

/**
 * Renders all weather data in the DOM
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export function updateWeather(lat, lon) {
  loadingScreenEl.style.display = "grid";
  wrapperEl.style.overflowY = "hidden";
  wrapperEl.classList.remove("fade-in");
  erroneousContentEl.style.display = "none";

  const currentWeatherSec = document.querySelector("[data-current-weather]");
  const highlightsSec = document.querySelector("[data-highlights]");
  const hourlyForecastSec = document.querySelector("[data-hourly-forecast]");
  const weeklyForecastSec = document.querySelector("[data-5-day-forecast]");

  currentWeatherSec.innerHTML = "";
  highlightsSec.innerHTML = "";
  hourlyForecastSec.innerHTML = "";
  weeklyForecastSec.innerHTML = "";

  if (window.location.hash === "#/current-location") {
    currentLocationBtn.setAttribute("disabled", "");
  } else {
    currentLocationBtn.removeAttribute("disabled");
  }

  // Current weather API integration
  fetchWeatherData(url.getCurrentWeather(lat, lon), (currentWeather) => {
    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: { temp, feels_like, pressure, humidity },
      visibility,
      timezone,
    } = currentWeather;

    const [{ description, icon }] = weather;

    const cardEl = document.createElement("div");
    cardEl.classList.add("current-weather-card", "card", "card-lg");

    cardEl.innerHTML = `
      <h2 class="card-title | title-2">Now</h2>

      <div class="container">
        <p class="heading">${Math.round(Number(temp))}&deg;<sup>C</sup></p>

        <img
          src="./images/weather-icons/${icon}.png"
          alt="${description}"
          width="64"
          height="64"
          class="weather-icon"
        />
      </div>

      <p class="body-3">${description}</p>

      <ul class="meta-list">
        <li class="meta-item">
          <i class="msr-icon">calendar_today</i>

          <p class="meta-text | title-3">${module.getDate(
            dateUnix,
            timezone
          )}</p>
        </li>

        <li class="meta-item">
          <i class="msr-icon">location_on</i>

          <p class="meta-text | title-3" data-location></p>
        </li>
      </ul>
    `;

    fetchWeatherData(url.undoGeocoding(lat, lon), ([{ name, country }]) => {
      cardEl.querySelector("[data-location]").innerHTML = `${name}, ${country}`;
    });

    currentWeatherSec.appendChild(cardEl);

    // Today's highlights
    fetchWeatherData(url.getAirPollutionData(lat, lon), (airPollutionData) => {
      const [
        {
          main: { aqi },
          components: { no2, o3, so2, pm2_5 },
        },
      ] = airPollutionData.list;

      const cardEl = document.createElement("div");
      cardEl.classList.add("card", "card-lg");

      cardEl.innerHTML = `
        <h2 class="title-2" id="highlights-today">Today's Highlights</h2>

        <div class="highlight-list">
          <div class="highlight-card | card card-sm one">
            <h3 class="title-3">Air Quality Index</h3>

            <div class="container">
              <i class="msr-icon">air</i>

              <ul class="card-list">
                <!-- Highlight 1 -->
                <li class="card-item">
                  <p class="title-1">${pm2_5.toPrecision(3)}</p>

                  <p class="label-1">PM<sub>2.5</sub></p>
                </li>

                <!-- Highlight 2 -->
                <li class="card-item">
                  <p class="title-1">${so2.toPrecision(3)}</p>

                  <p class="label-1">SO<sub>2</sub></p>
                </li>

                <!-- Highlight 3 -->
                <li class="card-item">
                  <p class="title-1">${no2.toPrecision(3)}</p>

                  <p class="label-1">NO<sub>2</sub></p>
                </li>

                <!-- Highlight 4 -->
                <li class="card-item">
                  <p class="title-1">${o3.toPrecision(3)}</p>

                  <p class="label-1">O<sub>3</sub></p>
                </li>
              </ul>
            </div>

            <span class="badge | aqi-${aqi} label-${aqi}" title="${
        module.aqiStatusDescriptions[aqi].description
      }">
             ${module.aqiStatusDescriptions[aqi].status}
            </span>
          </div>

          <!-- Sunrise & sunset -->
          <div class="highlight-card | card card-sm two">
            <h3 class="title-3">Sunrise & Sunset</h3>

            <div class="card-list">
              <div class="card-item">
                <i class="msr-icon">clear_day</i>

                <div>
                  <p class="label-1">Sunrise</p>

                  <p class="title-1">${module.getTime(
                    sunriseUnixUTC,
                    timezone
                  )}</p>
                </div>
              </div>

              <div class="card-item">
                <i class="msr-icon">clear_night</i>

                <div>
                  <p class="label-1">Sunset</p>

                  <p class="title-1">${module.getTime(
                    sunsetUnixUTC,
                    timezone
                  )}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Humidity -->
          <div class="highlight-card card card-sm">
            <h3 class="title-3">Humidity</h3>

            <div class="container">
              <i class="msr-icon">humidity_percentage</i>

              <p class="title-1">${humidity}<sub>%</sub></p>
            </div>
          </div>

          <!-- Pressure -->
          <div class="highlight-card card card-sm">
            <h3 class="title-3">Pressure</h3>

            <div class="container">
              <i class="msr-icon">airwave</i>

              <p class="title-1">${pressure}<sub>hPa</sub></p>
            </div>
          </div>

          <!-- Visibility -->
          <div class="highlight-card card card-sm">
            <h3 class="title-3">Visibility</h3>

            <div class="container">
              <i class="msr-icon">visibility</i>

              <p class="title-1">${visibility / 1000}<sub>km</sub></p>
            </div>
          </div>

          <!-- Feels Like -->
          <div class="highlight-card card card-sm">
            <h3 class="title-3">Feels Like</h3>

            <div class="container">
              <i class="msr-icon">thermostat</i>

              <p class="title-1">${Math.round(
                Number(feels_like)
              )}&deg;<sup>C</sup></p>
            </div>
          </div>
        </div>
      `;

      highlightsSec.appendChild(cardEl);
    });

    // Hourly forecast section
    fetchWeatherData(url.getHourlyForecast(lat, lon), (forecast) => {
      const {
        list: forecastList,
        city: { timezone },
      } = forecast;

      hourlyForecastSec.innerHTML = `
        <h2 class="title-2">Today at</h2>

        <div class="slider-container">
          <ul class="slider-list" data-temp></ul>

          <ul class="slider-list" data-wind></ul>
        </div>
      `;

      for (let [index, data] of forecastList.entries()) {
        if (index > 7) break;

        const {
          dt: dateTimeUnix,
          main: { temp },
          weather,
          wind: { deg: windDirection, speed: windSpeed },
        } = data;

        const [{ icon, description }] = weather;

        const tempLi = document.createElement("li");
        tempLi.classList.add("slider-item");

        tempLi.innerHTML = `
          <div class="slider-card | card card-sm">
            <p class="body-3">${module.getHours(dateTimeUnix, timezone)}</p>

            <img
              src="./images/weather-icons/${icon}.png"
              alt="${description}"
              loadind="lazy"
              width="48"
              height="48"
              class="weather-icon"
              title="${description}"
            />

            <p class="body-3">${Math.round(Number(temp))}&deg;</p>
        </div>
        `;

        hourlyForecastSec.querySelector("[data-temp]").appendChild(tempLi);

        const windLi = document.createElement("li");
        windLi.classList.add("slider-item");

        windLi.innerHTML = `
          <div class="slider-card | card card-sm">
            <p class="body-3">${module.getHours(dateTimeUnix, timezone)}</p>

            <img
              src="./images/weather-icons/direction.png"
              alt="Wind direction"
              loadind="lazy"
              width="48"
              height="48"
              class="weather-icon"
              style="transform: rotate(${windDirection - 180}deg)"
            />

            <p class="body-3">${Math.round(
              module.convertMpsToKmph(windSpeed)
            )} km/h</p>
          </div>
        `;

        hourlyForecastSec.querySelector("[data-wind]").appendChild(windLi);
      }

      // 5-day-forecast
      weeklyForecastSec.innerHTML = `
        <h2 class="title-2" id="forecast-label">5 Day Forecast</h2>

        <div class="forecast-cards | card card-lg">
          <ul data-5-day-forecast-list></ul>
        </div>
      `;

      for (let i = 7, len = forecastList.length; i < len; i += 8) {
        const {
          main: { temp_max },
          weather,
          dt_txt,
        } = forecastList[i];

        const [{ icon, description }] = weather;

        const date = new Date(dt_txt);

        const li = document.createElement("li");
        li.classList.add("card-item");

        li.innerHTML = `
          <div class="icon-wrapper">
            <img
              src="./images/weather-icons/${icon}.png"
              alt="${description}"
              width="36"
              height="36"
              class="weather-icon"
              title="${description}"
            />

            <span class="span">
              <p class="title-2">${Math.round(Number(temp_max))}&deg;</p>
            </span>
        </div>

        <p class="label-1">
        ${date.getDate()} ${module.monthNames[date.getUTCMonth()]}
        </p>

        <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
        `;

        weeklyForecastSec
          .querySelector("[data-5-day-forecast-list]")
          .appendChild(li);
      }

      loadingScreenEl.style.display = "none";
      wrapperEl.style.overflowY = "auto";
      wrapperEl.classList.add("fade-in");
    });
  });
}

export const handleError404 = () => (erroneousContentEl.style.display = "flex");
