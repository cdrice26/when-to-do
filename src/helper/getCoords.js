/**
 * Given a string, uses it as a search query and returns the coordinates of the first result
 * @param {String} location - The search query for the location to get coordinates for
 * @returns {Array} - The coordinates of the location
 */
const getCoords = async (location) => {
  // Attempt to get the cached results from localStorage, if they exist
  const cachedRaw = localStorage.getItem(`locations/${location}`);
  const isCached = cachedRaw !== null && cachedRaw !== undefined;

  // If cached results exists, use those. Otherwise, get the results from the API
  const cached = JSON.parse(cachedRaw);
  const resp1 = isCached
    ? null
    : await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${process.env.API_KEY}&text=${location}`
      );
  const json = isCached ? cached : await resp1.json();
  if (!isCached) {
    localStorage.setItem(`locations/${location}`, JSON.stringify(json));
  }

  // If the results are not empty, return the coordinates of the first result
  return json.features[0]?.geometry.coordinates;
};

export default getCoords;
