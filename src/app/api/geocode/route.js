import { NextResponse } from 'next/server';

/**
 * Handles POST requests to the /api/geocode endpoint. Returns the coordinates of the given location
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function POST(request) {
  const body = await request.json();
  const location = body.location;
  const coordsResp = await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=${process.env.API_KEY}&text=${location}`
  );
  const coordsJson = await coordsResp.json();
  return NextResponse.json(coordsJson);
}
