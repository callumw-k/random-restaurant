import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${req.body.keyword}%2Crestaurant&location=${req.body.lat}%2C${req.body.lng}&rankby=distance&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  res.status(200).json(data);
}
