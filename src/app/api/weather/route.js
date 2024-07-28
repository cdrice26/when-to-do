import { NextResponse } from 'next/server';

/**
 * Handle POST requests to the /api/weather endpoint. Returns the weather information for the given latitude and longitude
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object containing the weather information.
 */
export async function POST(request) {
  const body = await request.json();
  const latitude = body.latitude;
  const longitude = body.longitude;
  const directionsResp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability`
  );
  const directionsJson = await directionsResp.json();
  return NextResponse.json(directionsJson);
}
