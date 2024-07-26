import getCoords from './getCoords';

/**
 * Given two search queries, returns the driving time between the coordinates of each
 * @param {String} location1 - Search query for starting location
 * @param {String} location2 - Search query for ending location
 * @returns {Number} - The driving time from location1 to location2 in minutes
 */
const getDrivingTime = async (location1, location2) => {
  // For testing only
  // return fakeGetDrivingTime(location1, location2);

  // Get coordinates
  const coord1 = await getCoords(location1);
  const coord2 = await getCoords(location2);

  // If both coordinates actually exist, get driving time between them and return it
  // Otherwise, just return 0 (don't account for driving time)
  if (coord1 !== undefined && coord2 !== undefined) {
    // Check for cached API result from last hour
    const cachedRaw = localStorage.getItem(
      `drivingTime-${location1}-${location2}`
    );
    const isCached = cachedRaw !== null && cachedRaw !== undefined;
    if (isCached) {
      const cached = JSON.parse(cachedRaw);
      const timestamp = new Date(cached.timestamp);
      if (Date.now() - timestamp < 1000 * 60 * 60)
        // 1 hour
        return cached.drivingTime;
    }

    const directionsResp = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.API_KEY}&start=${coord1[0]},${coord1[1]}&end=${coord2[0]},${coord2[1]}`
    );
    const directionsJson = await directionsResp.json();

    // If the response is not valid, just return 0
    if (directionsJson === undefined) return 0;
    if (directionsJson.features === undefined) return 0;
    if (directionsJson.features.length < 1) return 0;
    if (directionsJson.features[0] === undefined) return 0;
    if (!directionsJson.features[0]?.properties.summary.duration) return 0;

    // Return the driving time in minutes
    const drivingTime = directionsJson.features[0]?.properties.summary.duration;
    const realDT = drivingTime / 60;

    // Cache the driving time
    localStorage.setItem(
      `drivingTime-${location1}-${location2}`,
      JSON.stringify({ timestamp: Date.now(), drivingTime: realDT })
    );
    return realDT;
  } else {
    return 0;
  }
};

// For testing only - fake getDrivingTime API
const fakeGetDrivingTime = async (location1, location2) => {
  if (location1 != undefined && location2 != undefined) {
    return Math.random() * 50;
  }
  return 0;
};

export default getDrivingTime;
