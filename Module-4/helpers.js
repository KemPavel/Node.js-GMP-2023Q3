import { SUPPORTED_COUNTRIES } from './config.js';

const validateCountry = (country) => {
  return SUPPORTED_COUNTRIES.includes(country);
};

const validateYear = (year) => {
  return year === new Date().getFullYear();
};

export const validateInput = ({ year, country }) => {
  if (country && !validateCountry(country)) {
    throw new Error(`Country provided is not supported, received: ${country}`);
  }

  if (year && !validateYear(year)) {
    throw new Error(`Year provided not the current, received: ${year}`);
  }

  return true;
};

export const shortenPublicHoliday = (holiday) => {
  return {
    name: holiday.name,
    localName: holiday.localName,
    date: holiday.date,
  };
};
