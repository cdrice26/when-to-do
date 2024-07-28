import { useEffect, useState } from 'react';

/**
 * A custom hook that provides persistent state using localStorage.
 *
 * @param {string} key - The key used to store the value in localStorage.
 * @param {T} initialValue - The initial value of the state.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - An array containing the current state value and a function to update the state value.
 */
const usePersistentState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== 'null' && storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        return reviveDates(parsedValue);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const valueToStore = JSON.stringify(value, replaceDates);
      localStorage.setItem(key, valueToStore);
    }
  }, [key, value]);

  return [value, setValue];
};

/**
 * A replacer function for JSON.stringify to convert Date objects to ISO strings.
 */
const replaceDates = (key, value) => {
  if (this && this[key] instanceof Date) {
    return this[key].toISOString();
  }
  return value;
};

/**
 * A reviver function for JSON.parse to convert ISO strings back to Date objects.
 */
const reviveDates = (value) => {
  if (value && typeof value === 'object') {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (typeof value[key] === 'string' && isISODate(value[key])) {
          value[key] = new Date(value[key]);
        } else if (typeof value[key] === 'object') {
          value[key] = reviveDates(value[key]);
        }
      }
    }
  }
  return value;
};

/**
 * Checks if a string is an ISO date string.
 */
const isISODate = (str) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(str);
};

export default usePersistentState;
