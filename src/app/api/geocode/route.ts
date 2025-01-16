import { NextResponse } from 'next/server';
import { RateLimiter } from '@/helper/rateLimiter';

// Create a singleton rate limiter instance
const geocodeRateLimiter = new RateLimiter(1.667);

/**
 * Handles POST requests to the /api/geocode endpoint. Returns the coordinates of the given location
 *
 * @param {Request} request - The incoming request object.
 * @return {Promise<NextResponse>} The response object.
 */
export async function POST(request: Request) {
  // Wait for rate limit token
  await geocodeRateLimiter.waitForToken();

  const body = await request.json();
  const location = body.location;

  try {
    const coordsResp = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${process.env.API_KEY}&text=${location}`
    );
    const coordsJson = await coordsResp.json();
    return NextResponse.json(coordsJson);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch geocode data' },
      { status: 500 }
    );
  }
}
