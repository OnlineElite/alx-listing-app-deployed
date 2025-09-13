// pages/api/properties.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const options = {
      method: "GET",
      url: "https://airbnb-listings.p.rapidapi.com/v2/listingsByZipcode",
      params: {
        state: "us",
        zipcode: "92037", // make this dynamic if needed
        offset: "0",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY as string, 
        "x-rapidapi-host": "airbnb-listings.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    // Format results
    const formatted = response.data?.data?.map((listing: any) => ({
      id: listing.id,
      title: listing.name,
      image: listing.pictures?.[0] || "",
      price: listing.pricing?.rate?.amount || "N/A",
      location: listing.address || "Unknown",
    }));

    res.status(200).json(formatted);
  } catch (error: any) {
    console.error("Error fetching properties:", error.message);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}
