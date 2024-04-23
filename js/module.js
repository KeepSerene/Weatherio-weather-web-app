/**
 * @license MIT
 * @fileoverview Manages all modular functions
 * @copyright Dhrubajyoti Bhattacharjee 2024, All Rights Reserved
 * @author Dhrubajyoti Bhattacharjee <dhrubajyotibhattacharjee182@gmail.com>
 */

export const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @param {number} unixDate Unix date in seconds
 * @param {number} timezone Timezone offset from UTC in seconds
 * @returns {string} Date str format, e.g., "Sunday 21, Apr"
 */

export function getDate(unixDate, timezone) {
  const date = new Date((unixDate + timezone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];

  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
}

/**
 * @param {number} unixTime Unix time in seconds
 * @param {number} timezone Timezone offset from UTC in seconds
 * @returns {string} Time str format: "HH:MM AM/PM"
 */
export function getTime(unixTime, timezone) {
  const date = new Date((unixTime + timezone) * 1000);
  const hours = date.getUTCHours();
  const mins = date.getUTCMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${mins} ${amPm}`;
}

/**
 * @param {number} unixTime Unix time in seconds
 * @param {number} timezone Timezone offset from UTC in seconds
 * @returns {string} Hours str format: "HH AM/PM"
 */
export function getHours(unixTime, timezone) {
  const date = new Date((unixTime + timezone) * 1000);
  const hours = date.getUTCHours();
  const amPm = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12} ${amPm}`;
}

/**
 * @param {number} mps Meters per second
 * @returns {number} kilometers per hour
 */
export const convertMpsToKmph = (mps) => (mps * 3600) / 1000;

export const aqiStatusDescriptions = {
  1: {
    status: "Good",
    description:
      "Air quality is considered satisfactory, and air pollution poses little or no risk.",
  },

  2: {
    status: "Fair",
    description:
      "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
  },

  3: {
    status: "Moderate",
    description:
      "Memebers of sensitive groups may experience health effects. The general public is not likely to be affected.",
  },

  4: {
    status: "Poor",
    description:
      "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
  },

  5: {
    status: "Very Poor",
    description:
      "Health warnings of emergency conditions. The entire population is more likely to be affected.",
  },
};
