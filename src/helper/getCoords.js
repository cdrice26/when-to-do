const getCoords = async (location) => {
  // Attempt to get the cached results from localStorage, if they exist
  const cachedRaw = localStorage.getItem(`locations/${location}`);
  const isCached = cachedRaw !== null && cachedRaw !== undefined;

  try {
    // If cached results exist, use those. Otherwise, get the results from the API
    const resp1 = isCached
      ? null
      : await fetch('/api/geocode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location })
        });

    // If the response is not valid, throw an error
    if (resp1 !== null && !resp1.ok) {
      throw new Error('API is down');
    }

    const json = isCached ? JSON.parse(cachedRaw) : await resp1.json();
    if (!isCached) {
      localStorage.setItem(`locations/${location}`, JSON.stringify(json));
    }

    // If the results are not empty, return the coordinates of the first result
    return json.features[0]?.geometry.coordinates;
  } catch (error) {
    // Handle fetch errors or invalid responses
    if (!isCached) {
      // If there's an error fetching and no cached data, return undefined
      localStorage.removeItem(`locations/${location}`);
    }
    throw new Error('API is down');
  }
};

export default getCoords;
