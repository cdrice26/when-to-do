// __tests__/getCoords.test.js
import getCoords from '../src/helper/getCoords';
import { MockFetch } from '../src/types/testingTypes';

beforeEach(() => {
  (fetch as MockFetch).resetMocks();
  localStorage.clear();
});

test('returns coordinates from cache', async () => {
  const location = 'test-location';
  const coordinates = [12.34, 56.78];
  const cachedData = {
    features: [{ geometry: { coordinates } }]
  };

  // Mock localStorage to return cached data
  localStorage.setItem(`locations/${location}`, JSON.stringify(cachedData));

  const result = await getCoords(location);

  expect(result).toEqual(coordinates);
  expect(fetch).not.toHaveBeenCalled();
});

test('fetches coordinates from API and caches the result', async () => {
  const location = 'test-location';
  const coordinates = [12.34, 56.78];
  const apiResponse = {
    features: [{ geometry: { coordinates } }]
  };

  (fetch as MockFetch).mockResponseOnce(JSON.stringify(apiResponse));

  const result = await getCoords(location);

  expect(result).toEqual(coordinates);
  expect(fetch).toHaveBeenCalledWith('/api/geocode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ location })
  });
  expect(localStorage.getItem(`locations/${location}`)).toEqual(
    JSON.stringify(apiResponse)
  );
});

test('returns undefined if no coordinates found', async () => {
  const location = 'test-location';
  const apiResponse = {
    features: []
  };

  (fetch as MockFetch).mockResponseOnce(JSON.stringify(apiResponse));

  const result = await getCoords(location);

  expect(result).toBeUndefined();
  expect(fetch).toHaveBeenCalledWith('/api/geocode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ location })
  });
});

test('handles API errors gracefully', async () => {
  const location = 'test-location';

  // @ts-ignore
  (fetch as MockFetch).mockReject(() => Promise.reject('API is down'));

  await expect(getCoords(location)).rejects.toThrow('API is down');
  expect(localStorage.getItem(`locations/${location}`)).toBeNull();
});
