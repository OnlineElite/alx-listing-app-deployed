// pages/api/properties/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing property ID" });
  }

  try {
    const options = {
      method: "GET",
      url: "https://airbnb-listings.p.rapidapi.com/v2/listing",
      params: { id: id.toString() },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY as string, 
        "x-rapidapi-host": "airbnb-listings.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    // Format the data before sending it 
    const property = {
      id: response.data?.data?.id,
      title: response.data?.data?.name,
      description: response.data?.data?.description || "",
      image: response.data?.data?.pictures?.[0] || "",
      price: response.data?.data?.pricing?.rate?.amount || "N/A",
      location: response.data?.data?.address || "Unknown",
      rating: response.data?.data?.reviewsSummary?.averageRating || 0,
    };

    res.status(200).json(property);
  } catch (error: any) {
    console.error("Error fetching property details:", error.message);
    res.status(500).json({ error: "Failed to fetch property details" });
  }
}
