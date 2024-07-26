import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const coord1 = body.coord1;
  const coord2 = body.coord2;
  const directionsResp = await fetch(
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.API_KEY}&start=${coord1[0]},${coord1[1]}&end=${coord2[0]},${coord2[1]}`
  );
  const directionsJson = await directionsResp.json();
  return NextResponse.json(directionsJson);
}
