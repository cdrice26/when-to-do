import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * A custom hook that provides persistent state using localStorage.
 *
 * @param {string} key - The key used to store the value in localStorage.
 * @param {T} initialValue - The initial value of the state.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - An array containing the current state value and a function to update the state value.
 */
const usePersistentState = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  // Always start with the initial value (matches SSR)
  const [value, setValueRaw] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // After mount, load from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null && storedValue !== 'null') {
        setValueRaw(reviveDates(JSON.parse(storedValue)));
      }
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Only save to localStorage after hydration (prevents overwriting)
  useEffect(() => {
    if (typeof window !== 'undefined' && hydrated) {
      localStorage.setItem(key, JSON.stringify(value, replaceDates));
    }
  }, [key, value, hydrated]);

  // Wrap setValue to ensure only T is accepted
  const setValue: Dispatch<SetStateAction<T>> = (newValue) => {
    setValueRaw(newValue);
  };

  return [value, setValue];
};

/**
 * A replacer function for JSON.stringify to convert Date objects to ISO strings.
 */
const replaceDates = (key: string, value: any) => {
  if (this === undefined) return value;
  if (this && (this as any)[key] instanceof Date) {
    return (this as any)[key].toISOString();
  }
  return value;
};

/**
 * A reviver function for JSON.parse to convert ISO strings back to Date objects.
 */
const reviveDates = (value: any) => {
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
const isISODate = (str: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(str);
};

export default usePersistentState;
