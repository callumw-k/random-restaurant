import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${req.body.keyword}%2Crestaurant&location=${req.body.lat}%2C${req.body.lng}&rankby=distance&key=${process.env.GOOGLE_MAPS_SERVER_API}`
  );
  const data = await response.json();
  res.status(200).json(data);
}
